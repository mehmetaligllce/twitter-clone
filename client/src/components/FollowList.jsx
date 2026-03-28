import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FollowingList = () => {
    const [followings, setFollowings] = useState([]);
    const [mesaj, setMesaj] = useState('');

    const { id } = useParams();
    const {t}=useTranslation();
    useEffect(() => {
        const fetchFollowings = async () => {
            if (!id) return; 

            try {
                const response = await axios.get(`http://localhost:3000/api/follow/following/${id}`, { withCredentials: true })
                setFollowings(response.data.followings);
            }
            catch(err)
            {
                setMesaj(`Bir hata ile karşılaştık : ${err}`);
            }
        }
        fetchFollowings();
    }, [id])

    return(
        <div className="followingListContainer">
            <h2>{t('following')}</h2>
            {followings.length === 0 ? (
                <p>{t('no_following')}</p>
            ) : (
                followings.map((item) => (
                    <div key={item.id}>
                        <p>{item.following.username}</p>
                    </div>
                ))
            )}
            <p>{mesaj}</p>
        </div>
    )

}
export default FollowingList;
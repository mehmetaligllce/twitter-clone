import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FollowerList = () => {
    const [followers, setFollowers] = useState([]);
    const [mesaj, setMesaj] = useState('');

    const { id } = useParams();
    const {t}=useTranslation();

    useEffect(() => {
        const fetchFollowers = async () => {
            if (!id) return; 
            try {
                const response = await axios.get(`http://localhost:3000/api/follow/followers/${id}`, { withCredentials: true })
                setFollowers(response.data.followers);
            }
            catch(err)
            {
                setMesaj(`Bir hata ile karşılaştık : ${err}`);
            }
        }
        fetchFollowers();
    }, [id]) 

    return(
        <div className="followerListContainer">
            <h2>{t('followers')}</h2>
            {followers.length===0 ? (
                <p>{t('no_followers')}</p>
            ) : (
                followers.map((item) => (
                    <div key={item.id}>
                        <p>{item.follower.username}</p>
                    </div>
                ))
            )}
            <p>{mesaj}</p>
        </div>
    )

}
export default FollowerList;
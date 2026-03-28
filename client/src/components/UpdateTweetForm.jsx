import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from 'react-i18next';

const UpdateTweetForm = () => {
    const { id } = useParams();
    const user = useAuthStore(state => state.user);
    const [mesaj, setMesaj] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const {t}=useTranslation();

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/api/tweets/update-tweet/${id}`, { content }, { withCredentials: true });
            setMesaj('Güncelleme başarılı');
            navigate('/');
        }
        catch (err) {
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }
    return (
        <div className="updateTweetContainer">
            <h1>{t('update_tweet')}</h1>
            <input type="text" placeholder={t('tweet_content')} value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleUpdate}>{t('update_tweet')}</button>
            <p>{mesaj}</p>
            <Link to="/">{t('back_to_homepage')}</Link>
        </div>
    )

}
export default UpdateTweetForm;
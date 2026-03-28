import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';

const TweetForm = () => {
    const [content, setContent] = useState('');
    const [mesaj, setMesaj] = useState('');

    const{t}=useTranslation();
    const navigate = useNavigate();

    const handleTweet = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/tweets/create-tweet', {
                content
            },{withCredentials:true})

            setContent( response.data);
            setMesaj('Tweet oluşturuldu!');
            navigate('/');
        }
        catch(err)
        {
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }
    return(
        <div className="TweetFormContainer">
            <h1>{t('create_tweet')}</h1>
            <input type="text" placeholder={t('tweet_content')} value={content} onChange={(e)=>setContent(e.target.value)} />
            <button onClick={handleTweet}>{t('create_tweet')}</button>
            <p>{mesaj}</p>
            <Link to="/">{t('back_to_homepage')}</Link>
        </div>
    )
}
export default TweetForm;
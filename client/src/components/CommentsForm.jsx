import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CommentsForm = () => {
    const [content, setContent] = useState('');
    const [mesaj, setMesaj] = useState('');
    
    const { tweetId } = useParams();

    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleComment = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/comments/create-comment/${tweetId}`, {
                content:content
            },{withCredentials:true})

            setContent(''); 
            setMesaj('Yorum oluşturuldu!');
            navigate('/');
        }
        catch(err)
        {
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }
    return(
        <div className="CommentsFormContainer">
            <h1>{t('create_comment')}</h1>
            <input type="text" placeholder={t('comment_content')} value={content} onChange={(e)=>setContent(e.target.value)} />
            <button onClick={handleComment}>{t('create_comment')}</button>
            <p>{mesaj}</p>
            <Link to="/">{t('back_to_homepage')}</Link>
        </div>
    )
}
export default CommentsForm;
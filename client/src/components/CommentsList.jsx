import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { CalculateDate } from "../utils/date.js";
import { useTranslation } from "react-i18next";


const CommentsList = () => {
    const user = useAuthStore((state) => state.user);
    const [comments, setComments] = useState([]); 
    const [mesaj, setMesaj] = useState('');
    const navigate = useNavigate();
    
    const { tweetId } = useParams();
    const {t} = useTranslation();

    const fetchComments = async () => {
        if (!user || !tweetId) return; 
        try {
           
            const response = await axios.get(`http://localhost:3000/api/comments/${tweetId}`, { withCredentials: true });
            setComments(response.data.comments); 
        }
        catch (err) {
            setMesaj(`Bir hata ile karşılaştık :${err}`);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [user, tweetId]);


    const handleDelete=async(Id)=>{
        try{
            await axios.delete(`http://localhost:3000/api/comments/delete-comment/${Id}`, { withCredentials: true });
            setMesaj('Silme Başarılı!');
            fetchComments();
        } catch (err) {
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }

    
    return (
        <div className="CommentsListContainer">
            <Link to='/' >{t('back_to_homepage')}</Link>
            <p>{mesaj}</p>

            {comments.length === 0 ? (
                <p>{t('no_comments')}</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id}>
                        <Link to={`/profile/${comment.author.id}`} className="profile-link">@{comment.author.username}</Link>
                        <p>{comment.content}</p>
                        <p>{t('comment_date')} : {new Date(comment.createdAt).toLocaleDateString()}</p>
                        

                        {user.id !== comment.authorId ? (
                            <>
                               
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleDelete(comment.id)} className="btn-delete">{t('delete')} 🗑️</button>
                            </>
                        )} 
                        <p className="tweet-stats"> {CalculateDate(comment.createdAt)}</p>
                        <hr className="hr"/>
                    </div>
                ))
            )}
        </div>
    )
}

export default CommentsList;
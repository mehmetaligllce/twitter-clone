import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { CalculateDate } from "../utils/date.js";
import { useTranslation } from "react-i18next";

const TweetList = () => {
    const user = useAuthStore((state) => state.user);
    const [tweets, setTweets] = useState([]);
    const [mesaj, setMesaj] = useState('');

    const navigate = useNavigate();
    const {t}=useTranslation();

    const fetchTweets = async () => {
        if (!user) return;
        try {
            const response = await axios.get('http://localhost:3000/api/tweets/feed', { withCredentials: true });
            setTweets(response.data.tweets);
        }
        catch (err) {
            setMesaj(`Bir hata ile karşılaştık :${err.message}`);
        }
    }

    useEffect(() => {
        fetchTweets();
    }, [user]);

    const handleLike = async (id) => {
        try {
            await axios.post(`http://localhost:3000/api/tweets/like/${id}`, {}, { withCredentials: true });
            setMesaj('Beğeni Güncellendi!');
            fetchTweets();
        } catch (err) {
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }


    const handleFollow = async (id) => {
        try {

            await axios.post(`http://localhost:3000/api/follow/toggle/${id}`, {}, { withCredentials: true });
            setMesaj('Takip Etme/Çıkma Başarılı');
            fetchTweets();
        } catch (err) {
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }

    const handleDelete = async (Id) => {
        try {
            await axios.delete(`http://localhost:3000/api/tweets/delete-tweet/${Id}`, { withCredentials: true });
            setMesaj('Silme Başarılı!');
            fetchTweets();
        } catch (err) {
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }


    return (
        <div className="tweetListContainer">
            <h2>{t('home')}</h2>
            <p>{mesaj}</p>

            {tweets.length === 0 ? (
                <p>{t('no_tweets')}</p>
            ) : (
                tweets.map((tweet) => (
                    <div key={tweet.id}>
                        <Link to={`/profile/${tweet.author.id}`} className="profile-link">@{tweet.author.username}</Link>
                        <p>{tweet.content}</p>
                        <p>{t('like_count')} : {tweet.likes ? tweet.likes.length : 0}</p>
                        <button onClick={() => navigate(`/comments/${tweet.id}`)}>{t('view_comments')}</button>
                        <button onClick={() => navigate(`/comments/create-comment/${tweet.id}`)}>{t('add_comment')}</button>


                        {user.id !== tweet.authorId ? (
                            <>
                                {tweet.likes.some(like => like.userId === user.id) ? (
                                    <button onClick={() => handleLike(tweet.id)} className="btn-unlike">{t('unlike')} 💔</button>
                                ) : (
                                    <button onClick={() => handleLike(tweet.id)}>{t('like')} ❤️</button>
                                )}

                                {tweet.author.followers && tweet.author.followers.some(follow => follow.followerId === user.id) ? (
                                    <button onClick={() => handleFollow(tweet.author.id)} className="btn-unfollow">{t('unfollow')}</button>
                                ) : (
                                    <button onClick={() => handleFollow(tweet.author.id)}>{t('follow')}</button>
                                )}
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate(`/update-tweet/${tweet.id}`)}>{t('update')} ✏️</button>
                                <button onClick={() => handleDelete(tweet.id)} className="btn-delete">{t('delete')} 🗑️</button>
                            </>
                        )}
                        <p className="tweet-stats">💬 {tweet._count.comments} {t('comments')} • 🕒 {CalculateDate(tweet.createdAt)}</p>
                        <hr className="hr" />

                    </div>
                ))
            )}
        </div>
    )
}

export default TweetList;
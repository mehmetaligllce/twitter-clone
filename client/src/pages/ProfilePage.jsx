import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar.jsx';
import FollowerList from "../components/FollowerList.jsx";
import FollowList from '../components/FollowList.jsx';
import UserTweets from '../components/UserTweets.jsx';
import { useNavigate, Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
    const { id } = useParams(); 
    const myUser = useAuthStore(state => state.user); 
    const [profile, setProfile] = useState(null);

    const {t}=useTranslation();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/auth/profile/${id}`, { withCredentials: true });
                setProfile(res.data.profileData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProfileData();
    }, [id]);

    if (!profile) return <div>Yükleniyor...</div>;

    const defaultAvatar = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";

    return(
        <div>
            <Navbar />
            
            <div className="profile-banner">
                <img 
                    src={profile.profileImage || defaultAvatar} 
                    alt="Profile Photo" 
                    className="profile-avatar"
                />
                <h1 className="profile-username">@{profile.username}</h1>
                
                <div className="profile-stats-container">
                    <p><strong>{profile._count.followers}</strong> {t('followers')}</p>
                    <p><strong>{profile._count.following}</strong> {t('following')}</p>
                    <p><strong>{profile._count.tweets}</strong> {t('tweets')}</p>
                </div>

                {myUser && Number(myUser.id) === Number(id) && (
                    <Link to="/update-profile" className="btn-update-profile">{t('update_profile')}</Link>
                )}
            </div>

            <hr className="hr" />

            <UserTweets />

            <hr className="hr" />

            <div className="profile-lists-layout">
                <div className="profile-list-column">
                    <FollowerList />
                </div>
                <div className="profile-list-column">
                    <FollowList />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ProfilePage;
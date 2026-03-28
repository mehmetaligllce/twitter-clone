import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";

const updateProfile = () => {

    const user = useAuthStore(state => state.user);

    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mesaj, setMesaj] = useState('');

    const {t}=useTranslation();
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put('http://localhost:3000/api/auth/update-profile', {
                username,
                password,
                profileImage
            }, { withCredentials: true })

            setMesaj('Profil başarıyla güncellendi');
            navigate(`/profile/${user.id}`); 
        }
        catch (err) {
            setMesaj(`Bir hata oluştu ${err.message}`);
        }
    }
    return (
        <div className="updateProfileContainer">
            <h2>{t('update_profile')}</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" placeholder={t('username')} value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder={t('profile_image_url')} value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
                <button onClick={handleUpdate}>{t('update')}</button>
            </form>

        </div>
    )




}
export default updateProfile;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {useTranslation} from 'react-i18next';

const Navbar = () => {
    const [mesaj, setMesaj] = useState('');
    const navigate = useNavigate();
    const {t}=useTranslation();

    const{user,checkAuth,logout}=useAuthStore();

    const handleLogout = async () => {
        logout();
        navigate('/login')
    }

    return (
        <div className='NavbarContainer'>
            

            {user ? (
                <>
                    <span>{t('welcome')}, {user.username} </span>
                    <Link to="/">{t('home')}</Link>
                    <Link to={`/profile/${user.id}`}>{t('profile')}</Link>
                    <Link to="/create-tweet">{t('create_tweet')}</Link>
                    <button onClick={handleLogout}>{t('logout')}</button>
                    

                    
                </>
            ) : ( 
                <>
                    <Link to="/register">{t('register')}</Link>
                    <Link to="/login">{t('login')}</Link>
                </>
            )}
        </div>
    )
}
export default Navbar;
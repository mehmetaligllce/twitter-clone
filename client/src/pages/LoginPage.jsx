import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mesaj, setMesaj] = useState('');

    const {t}=useTranslation();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login',
                {
                    username,
                    password
                }
                , { withCredentials: true }
            )
            setMesaj('Giriş Başarılı');
            navigate('/');
        }
        catch(err){
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }

    return(
        <div className="LoginContainer">
            <Navbar />
            <h1>{t('login')}</h1>
            <input type="text" placeholder={t('username')} value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" placeholder={t('password')} value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleRegister}>{t('login')}</button>
            <p>{mesaj}</p>

            <Link to="/register">{t('no_account')} {t('register')}</Link>
            <Footer />
        </div>
    )

}
export default LoginPage;
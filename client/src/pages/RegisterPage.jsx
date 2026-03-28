import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mesaj, setMesaj] = useState('');

    const navigate = useNavigate();
    const {t}=useTranslation();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register',
                {
                    username,
                    email,
                    password
                }
                , { withCredentials: true }
            )
            setMesaj('Kayıt Başarılı');
            navigate('/login');
        }
        catch(err){
            setMesaj(`Bir hata ile karşılaştık : ${err}`);
        }
    }

    return(
        <div className="RegisterContainer">
            <Navbar />
            <h1>{t('register')}</h1>
            <input type="text" placeholder={t('username')} value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" placeholder={t('email')} value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder={t('password')} value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleRegister}>{t('register')}</button>
            <p>{mesaj}</p>

            <Link to="/login">{t('no_account')} ? {t('login')}</Link>
            <Footer />
        </div>
    )

}
export default RegisterPage;
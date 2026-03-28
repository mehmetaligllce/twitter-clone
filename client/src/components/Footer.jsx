import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }
    return (
        <footer>

            <h6>Mehmet Ali Güllüce 2026</h6>
            <a href="https://github.com/mehmetaligllce" target="_blank">GitHub</a>
            <a href="mailto:gullucemehmetali46@gmail.com">Gmail</a>
            <br /><br />
            <button onClick={() => changeLanguage('tr')}>
                🇹🇷 Türkçe
            </button>
            <button onClick={() => changeLanguage('en')}>
                🇬🇧 English
            </button>
            <button onClick={() => changeLanguage('es')}>
                🇪🇸 Español
            </button>
            <br /><br /><br />
            <p>“Al final, todo valdrá la pena.”</p>

        </footer>
    )

}
export default Footer
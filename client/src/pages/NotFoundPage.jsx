import React from "react";
import { useTranslation } from "react-i18next";

const NotFoundPage=()=>{
    const {t}=useTranslation();
    return(
        <div className="NotFoundPageContainer">

            <h1>404</h1>
            <p>{t('page_not_found')}</p>
            <a href="/">{t('back_to_homepage')}</a>

        </div>
    )



}
export default NotFoundPage
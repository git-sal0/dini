import { Link, useLocation } from "react-router-dom";
import React, { useContext } from 'react';
import LogoDiniBlack from "./dini-logo-black.png";
import LogoDiniWhite from "./dini-logo-white.png"
import FlagMorocco from "./FlagMorocco.webp";
import { LanguageContext } from './LanguageContext';

export default function Navbar({ background }){
    const location = useLocation();
    const isHome = location.pathname === "/Acceuil";
    const logoToShow = isHome ? LogoDiniWhite : LogoDiniBlack;
    const { language, setLanguage, t } = useContext(LanguageContext);

    return(
        <div>
                <nav className={`NavBar ${isHome ? "transparent" : "NavBar-bg"}`}>
                    <ul className="Li-NavBar">
                    <li className="Logo-NavBar">
                        <Link to="/Acceuil"><img src={logoToShow} alt="Dini"></img></Link>
                    </li>
                    <li className="Elements">
                        <img src={FlagMorocco} alt="Lang" className="Lang-Button" aria-label="Lang" onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')} />
                        <Link className="White-Button" to="/AjouterTrajet">{t('navbar_add')}</Link>
                        <Link className="White-Button" to="/Signin">{t('navbar_signin')}</Link>
                        <Link className="Blue-Button" to="/Login">{t('navbar_login')}</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
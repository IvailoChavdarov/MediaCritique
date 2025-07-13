import { NavLink } from "react-router-dom";
import './TopNav.scss'
import { useRef, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function TopNav(){
    //gets browser name to show in call-to-action button for download
    const browserName = useRef(getBrowserName());

    //add class when user scrolls down page (after banner for example)
    const [isFixed, setIsFixed] = useState(false);

    //follows if menu is toggled on mobile
    const [isOpen, setIsOpen] = useState(false);

    //to close nav on mobile when going to different page
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
      useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return(
        <div className={`top-navigation ${isFixed ? 'fixed' : ''} ${isOpen ? 'open' : ''}`}>
            <nav>
                <div>
                    <NavLink className="nav-brand" to="/"><img src="/images/logo3.png" alt="MediaCritique"/></NavLink>
                    <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}> {isOpen ? '×' : '☰'} </button>

                </div>
                <div className="center">
                    <NavLink to="/opinions">Мнения</NavLink>
                    <NavLink to="/medias">Медии</NavLink>
                    <NavLink to="/frequent">Често срещани лъжи</NavLink>
                    <NavLink to="/about">За нас</NavLink>
                </div>
                <div>
                    <NavLink to="/report">Сигнализирай</NavLink>
                    <NavLink to="/download" className="call-to-action-button">Добави към {browserName.current === "?"? "Браузър" : browserName.current }</NavLink>
                </div>
            </nav>
        </div>
    )
}

function getBrowserName() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("opr/") || userAgent.includes("opera"))
    if (userAgent.includes('firefox')) return "Firefox";
    if (userAgent.includes('edg')) return "Edge";
    if (navigator.brave) return "Brave";
    if (userAgent.includes("safari/") && !userAgent.includes("chrome/") && !userAgent.includes("chromium/")) return "Safari";
    return "Chrome";
}

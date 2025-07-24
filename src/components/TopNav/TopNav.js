import { NavLink } from "react-router-dom";
import './TopNav.scss'
import { useRef, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { scrollToTop } from "../../utils/scrollToTop";
import Logo from "../Logo/Logo";

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
                    <NavLink className="nav-brand" to="/" onClick={scrollToTop}><Logo width={"230px"}/></NavLink>
                    <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}> {isOpen ? '×' : '☰'} </button>

                </div>
                <div className="center">
                    <NavLink to="/opinions" onClick={scrollToTop}>Мнения</NavLink>
                    <NavLink to="/medias" onClick={scrollToTop}>Медии</NavLink>
                    <NavLink to="/lies" onClick={scrollToTop}>Често срещани лъжи</NavLink>
                    <NavLink to="/about" onClick={scrollToTop}>За нас</NavLink>
                </div>
                <div>
                    <NavLink to="/report" onClick={scrollToTop}>Сигнализирай</NavLink>
                    <NavLink to="/download" className="call-to-action-button" onClick={scrollToTop}>Добави към {browserName.current === "?"? "Браузър" : browserName.current }</NavLink>
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

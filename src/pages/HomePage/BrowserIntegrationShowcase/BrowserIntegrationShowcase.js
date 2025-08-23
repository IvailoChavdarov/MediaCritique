import { Link } from "react-router-dom";
import { IoLogoChrome } from "react-icons/io5";
import { FaEdge, FaFirefoxBrowser } from "react-icons/fa";
import { FaBrave, FaOpera  } from "react-icons/fa6";
import './BrowserIntegrationShowcase.scss'
import {scrollToTop} from '../../../utils/scrollToTop'
import { useEffect, useRef } from "react";
import animateOnScroll from "../../../utils/animateOnScroll";

export default function BrowserIntegrationShowcase(){
    useEffect(()=>{
        animateOnScroll(document.querySelector('#browser-logos-circle'))
    }, [])
    
    return(
        <div className="background-accent">
            <div className='showcase-block browser-integration'>
                <div className='showcase-half'>
                    <h3 className='showcase-heading'>Интеграция с различни браузъри</h3>
                    <h3 className='showcase-subheading'>Разширението MediaCritique се поддържа от Google Chrome, Brave, Microsoft Edge, Opera и Firefox</h3>
                    <Link to='/download' className='call-to-action-button' onClick={scrollToTop}>Добави към браузър сега</Link>
                </div> 
                <div id="browser-logos-circle" className='showcase-half browser-logos'>
                    <div className="browser-logo-container">
                        <IoLogoChrome/>
                    </div>
                    <div className="browser-logo-container">
                        <FaEdge/>
                    </div>
                    <div className="browser-logo-container">
                        <FaBrave/>
                    </div>
                    <div className="browser-logo-container">
                        <FaOpera/>
                    </div>
                    <div className="browser-logo-container">
                        <FaFirefoxBrowser/>
                    </div>
                </div>
            </div>
        </div>
    )
}
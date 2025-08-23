import ParticleBackground from './ParticleBackground/ParticleBackground';
import './HomeHero.scss'
import { FaDownload, FaFlag, FaFacebookSquare } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { Link } from "react-router";
import ImageComparison from './ImageComparison/ImageComparison';
import beforeFacebook from './images/before.webp'
import afterFacebook from './images/after.webp'
import beforeWebsite from './images/beforeWebsite.webp'
import afterWebsite from './images/afterWebsite.webp'
import { useState } from 'react';

export default function HomeBanner(){
    const [beforeSrc, setBeforeSrc] = useState(beforeFacebook)
    const [afterSrc, setAfterSrc] = useState(afterFacebook)
    const [isOnFacebookComparison, setIsOnFacebookComparison] = useState(true)

    const setFacebookComparison = () =>{
      setBeforeSrc(beforeFacebook)
      setAfterSrc(afterFacebook)
      setIsOnFacebookComparison(true)
    }
    
    const setWebsiteComparison = () =>{
      setBeforeSrc(beforeWebsite)
      setAfterSrc(afterWebsite)
      setIsOnFacebookComparison(false)
    }

    return(
      <>
      <section className="hero-section">
        <ParticleBackground/>
        <div className="hero-content">
          <h1 className="hero-title">
            Научете кой седи зад медиите.
          </h1>
          <h2 className='hero-subtitle'>
            Кой и как манипулира нашето общество? Кои са най-често срещаните лъжи? Бъдете информирани за истината с <b>Media<span className='text-accent'>Critique</span></b>.
          </h2>
          <div className="hero-buttons">
            <Link to="/download" className="call-to-action-button btn">
            <FaDownload />
              Добави към браузър
            </Link>
            <Link to="/report" className="btn btn-outline">
              <FaFlag /> Сигнализирай
            </Link>
          </div>
        </div>
        <div className='image-comparison-wrapper'>
          <div className='image-comparison-buttons'>
            <button onClick={setFacebookComparison} className={`${isOnFacebookComparison? "active" : ""}`}>
              <FaFacebookSquare />Facebook
            </button>
            <button onClick={setWebsiteComparison} className={`${!isOnFacebookComparison? "active" : ""}`}>
              <CgWebsite/>Уебсайт
            </button>
          </div>

          <ImageComparison 
            beforeSrc={beforeSrc}
            afterSrc={afterSrc}
          />
        </div>
      </section>
      </>
    )
}


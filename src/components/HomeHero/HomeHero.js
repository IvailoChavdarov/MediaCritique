import './HomeHero.scss'
import { FaDownload, FaFlag } from "react-icons/fa";
import { Link } from "react-router";
import NewsImage from './images/hero-laptop.png'
import NewsImage1 from './images/hero-1.jpeg'
import NewsImag2 from './images/3.png'
export default function HomeBanner(){
    return(
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Познавайте медиите. Бъдете скептични.
        </h1>
        <p className="hero-subtitle">
          <span className='text-accent'>MediaCritique</span> помага в информирането, дава информация за финансирането, скандалите и хората около различните новинарски медии. Бори се срещу дезинформацията.
        </p>
        <div className="hero-buttons">
          <Link to="/download" className="call-to-action-button btn">
            <FaDownload /> Добави към браузър
          </Link>
          <Link to="/report" className="btn btn-outline">
            <FaFlag /> Сигнализирай
          </Link>
        </div>
      </div>
      <div className='hero-image-container'>
              <img src={NewsImag2} className='hero-image' alt='news'/>
      </div>
    </section>
    )
}
import { useEffect, useRef } from 'react';
import './MediasCarousel.scss'
import { ReactSVG } from 'react-svg';
import bgMapSvg from './map.svg'
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../utils/scrollToTop'
export default function MediasCarousel({ scrollSpeed = 0.5 }){
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const items = [
        { link: '/medias/iIHXS0QJpSt6aUYy4VHe-actualno', image: 'https://cdn.actualno.eu/actualno-new-dev/production/cover.jpg' },
        { link: '/medias/I6jheHxxkBYraBb11f7L-fakti', image: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Fakti.bg_logo.jpg' },
        { link: '/medias/LI76wqcOLjcdIgjXSkuY-svobodna-evropa', image: 'https://www.svobodnaevropa.bg/Content/responsive/RFE/bg-BG/img/top_logo_news.png' },
        { link: '/medias/pI6bj2JLfGDmtOtwVEQl-informatsionna-agentsiya-pik', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/P%21K_logo.png/250px-P%21K_logo.png' },
        { link: '/medias/JyPdsrDRNzdszvi3F2x9-darik-radio', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Darik.svg/2560px-Darik.svg.png' },
        { link: '/medias/FvbEGVIaWukFJ11ywq95-kapital', image: 'https://webreport.bg/wp-content/uploads/2023/01/kapital-logo-300x150-1.png' },
        { link: '/medias/eSZtQRa9UEFLg2AzG4Me-blitzbg', image: 'https://blitz.bg/assets/blitz.bg/images/logo.png?timer=1744834024' },
        { link: '/medias/kaC2ZaO0RSijOq1VenVQ-factcheckbg', image: 'https://www.infoz.bg/images/+--2024-01/FctChck.png' }
    ];

    const tripledItems = [...items, ...items, ...items];

    useEffect(() => {
        const container = containerRef.current;
        const loopWidth = container.scrollWidth / 3;
        let animationFrame;

        container.scrollLeft = loopWidth;

        const autoScroll = () => {
        if (!isDragging.current) {
            container.scrollLeft += scrollSpeed;

            if (container.scrollLeft >= loopWidth * 2) {
            container.scrollLeft -= loopWidth;
            }
        }

        animationFrame = requestAnimationFrame(autoScroll);
        };

        animationFrame = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(animationFrame);
    }, [scrollSpeed]);

    // Dragging logic
    useEffect(() => {
        const container = containerRef.current;
        let startX = 0;
        let scrollLeft = 0;

        const startDrag = (e) => {
        isDragging.current = true;
        container.classList.add('dragging');
        startX = e.pageX || e.touches[0].pageX;
        scrollLeft = container.scrollLeft;
        };

        const onDrag = (e) => {
        if (!isDragging.current) return;
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
        };

        const endDrag = () => {
        isDragging.current = false;
        container.classList.remove('dragging');
        };

        container.addEventListener('mousedown', startDrag);
        container.addEventListener('touchstart', startDrag);
        container.addEventListener('mousemove', onDrag);
        container.addEventListener('touchmove', onDrag);
        container.addEventListener('mouseup', endDrag);
        container.addEventListener('mouseleave', endDrag);
        container.addEventListener('touchend', endDrag);

        return () => {
            container.removeEventListener('mousedown', startDrag);
            container.removeEventListener('touchstart', startDrag);
            container.removeEventListener('mousemove', onDrag);
            container.removeEventListener('touchmove', onDrag);
            container.removeEventListener('mouseup', endDrag);
            container.removeEventListener('mouseleave', endDrag);
            container.removeEventListener('touchend', endDrag);
        };
    }, []);

    return (
        <div className='medias-carousel-container'>
            <ReactSVG src={bgMapSvg} className='medias-carousel-background'/>
            <h3 className='medias-carousel-heading'>Информация за десетки големи български медии</h3>
            <Link to='/medias' className='call-to-action-button' onClick={scrollToTop}>Вижте всички</Link>
            <div className="medias-carousel-wrapper">
                <div className="medias-carousel" ref={containerRef}>
                    {tripledItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="medias-carousel-item"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={item.image} alt={`carousel-${index}`} draggable="false" />
                    </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
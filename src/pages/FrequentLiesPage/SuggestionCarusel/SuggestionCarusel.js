import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import './SuggestionCarusel.scss'
import ErrorPage from "../../../components/ErrorPage/ErrorPage";
import Loader from "../../../components/Loader/Loader";

export default function SuggestionCarusel() {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0)
    const [hasError, setHasError] = useState(false);

    const nextSlideTime = 10000;
    const intervalRef = useRef(null); 

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const snapshot = await getDocs(collection(db, "suggestedMedia"));
                setSuggestions(snapshot.docs.map(doc => ({
                    ...doc.data()
                })).reverse());
            } 
            catch (error) {
                setHasError(true)
            } 
            finally {
                setIsLoading(false);
            }
        };
        fetchSuggestions();
    }, []);

    useEffect(() => {
        startAutoRotation();
        return () => clearInterval(intervalRef.current);
    }, [suggestions]);

    const startAutoRotation = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            handleNext();
        }, nextSlideTime);
    };

    const handleNext = () => {
        setCurrentSlide(prev => 
            prev === suggestions.length - 1 ? 0 : prev + 1
        );
        resetAutoRotation();
    };

    const handlePrev = () => {
        setCurrentSlide(prev => 
            prev === 0 ? suggestions.length - 1 : prev - 1
        );
        resetAutoRotation();
    };

    const handleGoTo = (slide) => {
        setCurrentSlide(slide);
        resetAutoRotation();
    };

    const resetAutoRotation = () => {
        clearInterval(intervalRef.current);
        startAutoRotation();
    };

    if (isLoading) return <Loader/>;

    if(hasError) return <ErrorPage/>;
    
    return (
        <div className="suggestion-carusel">
            <div className="suggestion-carusel-content">
                {suggestions.map((media, index) => (
                    <div className={`suggestion-carusel-item-container ${currentSlide === index && "current"}`} key={index}>
                        <div className="suggestion-carusel-item">
                            <div className="suggestion-carusel-item-image">
                                <img src={media.imgUrl} alt={media.title + " logo"}/>
                            </div>
                            <div className="suggestion-carusel-item-content">
                                <h3>{media.title}</h3>
                                <p>{media.description}</p>
                                <Link to={media.url} target="_blank"><FaExternalLinkAlt /> {media.url}</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="carusel-indicators">
                {
                    suggestions.map((media, index) => (
                        <button className={`slide-indicator ${currentSlide === index && "current"}`} key={index} onClick={()=>handleGoTo(index)}></button>
                    ))
                }
            </div>
            <button onClick={handlePrev} className="goNextHandle"><RxCaretLeft /></button>
            <button onClick={handleNext} className="goPrevHandle"><RxCaretRight /></button>
        </div>
    );
}
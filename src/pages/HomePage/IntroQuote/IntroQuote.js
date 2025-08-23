import { useEffect, useRef, useState } from 'react';
import './IntroQuote.scss'
import { IoMdQuote } from "react-icons/io";

export default function Quote() {
  const quoteText =
    "Решаването на проблема с дезинформацията няма да излекува всички болести на нашите демокрации... но може да помогне за намаляване на разделенията и за възстановяване на доверието и солидарността, необходими за тяхното укрепване.";
  const [quoteCurrentText, setQuoteCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false); // prevent repeat
  const quoteRef = useRef(null);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 } // adjust as needed
    );

    if (quoteRef.current) observer.observe(quoteRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Typing effect
  useEffect(() => {
    if (!hasAnimated) return; // only start when triggered
    if (index < quoteText.length) {
      const timeout = setTimeout(() => {
        setQuoteCurrentText((prev) => prev + quoteText[index]);
        setIndex(index + 1);
      }, 15);

      return () => clearTimeout(timeout);
    }
  }, [index, quoteText, hasAnimated]);

  return (
    <div id="introQuote" ref={quoteRef} className="intro-quote-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg"
        alt="Barack Obama"
      />
      <blockquote cite="https://www.huxley.net/bnw/four.html" className="intro-quote">
        <IoMdQuote />
        <p className="quote-text">{quoteCurrentText}</p>
        <p className="quote-author">
          - Барак Обама, Президент на САЩ (2009 - 2017)
        </p>
      </blockquote>
    </div>
  );
}

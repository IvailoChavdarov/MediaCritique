import HomeHero from "./HomeHero/HomeHero";
import MediasCarousel from "./MediasCarousel/MediasCarousel";
import RiskMeterShowcase from "./RiskMeterShowcase/RiskMeterShowcase";
import './HomePage.scss'
import AdvantagesShowcase from "./AdvantagesShowcase/AdvantagesShowcase";
import ProjectIntroduction from "./ProjectIntroduction/ProjectIntroduction";
import BrowserIntegrationShowcase from "./BrowserIntegrationShowcase/BrowserIntegrationShowcase";
import MediaImportanceShowcase from "./MediaImportanceShowcase/MediaImportanceShowcase";
import OpinionsShowcase from "./OpinionsShowcase/OpinionsShowcase";
import IntroQuote from "./IntroQuote/IntroQuote";
import DownloadSection from "./DownloadSection/DownloadSection";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
export default function HomePage(){
    useDocumentTitle("Начало");
    return(
        <>
            <HomeHero/>
            <ProjectIntroduction/>
            <RiskMeterShowcase/>
            <AdvantagesShowcase/>
            <BrowserIntegrationShowcase/>
            <IntroQuote/> 
            <MediaImportanceShowcase/>     
            <OpinionsShowcase/>
            <MediasCarousel/>
            <DownloadSection/>
        </>
    )
}
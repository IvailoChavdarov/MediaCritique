import './RiskMeterShowcase.scss'
import { ReactSVG } from 'react-svg'
import riskMeterSVG from './risk-meter.svg'
import { IoCheckmarkDoneCircleSharp, IoCheckmarkCircleSharp, IoInformationCircleSharp, IoWarningSharp, IoNuclear  } from "react-icons/io5";
import { useEffect } from 'react';
import animateOnScroll from '../../../utils/animateOnScroll';

export default function RiskMeterShowcase(){
    useEffect(()=>{
        animateOnScroll(document.querySelector('#risk-meter-showcase'))
    }, [])
    
    return(
        <div id="risk-meter-showcase" className='showcase-block risk-meter-block'>
            <div className='showcase-half'>
                <h3 className='showcase-heading'>Въвеждаме нашият риск-метър</h3>
                <h4 className='showcase-subheading'>Ние сортираме медиите по ниво на заплаха за обществото, взимайки на предвид мащаб, въздействие, теми и други.</h4>
                <ul className='risk-meter-list'>
                    <li><span className='text-danger-none'><IoCheckmarkDoneCircleSharp/>Нулево</span> - няма значителни доказателства за лъжи или необективност.</li>
                    <li><span className='text-danger-low'><IoCheckmarkCircleSharp/>Ниско</span> - няма доказателства за лъжи, спорна обективност.</li>
                    <li><span className='text-danger-medium'><IoInformationCircleSharp/>Средно</span> - има доказателства за лъжи/необективност или част от информационна акция.</li>
                    <li><span className='text-danger-high'><IoWarningSharp/>Високо</span> - значителни доказателства за манипулация, медия бухалка</li>
                    <li><span className='text-danger-extreme'><IoNuclear/>Екстремно</span> - доказана част от чуждестранна пропаганда или опасна дезинформация</li>
                </ul>
            </div>
            <div className='showcase-half center-content risk-meter-container'><ReactSVG className='risk-meter' src={riskMeterSVG}/></div>
        </div>
    )
}
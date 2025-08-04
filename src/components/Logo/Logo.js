import { ReactSVG } from 'react-svg';
import './Logo.scss'
import LogoSVG from './Logo.svg'
import LogoSimpleSVG from './Logo-simple.svg'
export default function Logo({width, simple}){
    return(
        simple?
            <ReactSVG className="logo" style={{width:width}} src={
                LogoSimpleSVG
            }/>
            :
            <ReactSVG className="logo" style={{width:width}} src={
                LogoSVG
            }/>
        
    )
}
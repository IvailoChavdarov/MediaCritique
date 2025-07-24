import { ReactSVG } from 'react-svg';
import './Logo.scss'
import LogoSVG from './Logo.svg'
export default function Logo({width}){
    return(
        <ReactSVG className="logo" style={{width:width}} src={
            LogoSVG
        }/>
    )
}
import { NavLink } from "react-router-dom";
import './AdministrationSideNav.scss'
import { FaTableColumns } from "react-icons/fa6";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { PiMailboxFill } from "react-icons/pi";
import { TfiLayoutMediaOverlay } from "react-icons/tfi";
import { MdChatBubbleOutline } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { AiOutlineTeam } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";

export default function AdministrationSideNav(){
    return(
        <nav className="administration-sidenav">
            <ul className="sidenav-links">
                <li><FaTableColumns/><NavLink to='/dashboard'>Табло</NavLink></li>
                <li><MdChatBubbleOutline/><NavLink to='/cms/opinions'>Мнения</NavLink></li>
                <li><CgDanger/><NavLink to='/cms/frequent-lies'>Често срещани лъжи</NavLink></li>
                <li><TfiLayoutMediaOverlay/><NavLink to='/cms/medias'>Медии</NavLink></li>
                <li><FaFacebookSquare/><NavLink to='/cms/facebooks'>Профили</NavLink></li>
                <li><FaEnvelopeOpenText/><NavLink to='/cms/messages'>Съобщения</NavLink></li>
                <li><PiMailboxFill/><NavLink to='/cms/reports'>Докладвания</NavLink></li>
                <li><AiOutlineTeam/><NavLink to='/editors'>Редактори</NavLink></li>
            </ul>
        </nav>
    )
}
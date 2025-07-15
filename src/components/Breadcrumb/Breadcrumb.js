import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import './Breadcrumb.scss'
export default function Breadcrumb({path}){
    console.log(path)
    const pathActive = path.slice(0, path.length-1);
    const pathLast = path[path.length-1]
    
    return(
        path.length>0?
        <nav className='breadcrumb'>
            {pathActive.map((currentPath, i)=>(
                <>
                    <Link to={currentPath.url}>
                        {currentPath.name}
                    </Link>
                    <span className='separator'><IoIosArrowForward/></span>
                </>
            ))}
            <span>{pathLast.name}</span>
        </nav> : ""
    )
}
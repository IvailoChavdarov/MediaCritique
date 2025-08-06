import { Outlet } from "react-router-dom";
import AdministrationSideNav from "../AdministrationSideNav/AdministrationSideNav";

export default function AdministrationTemplate(){
    return(
        <div className="administration">
            <AdministrationSideNav/>
            <div className="administration-content">
                <Outlet />
            </div>
        </div>
    );
}
import { Routes ,Route } from "react-router-dom";
import { AdminProvider } from "../context/adminContext";

import { Main } from "../pages/visitors/main";
import { AboutUs } from "../pages/visitors/pages/aboutUs";
import Home from "../pages/visitors/pages/home";
import Projects from "../pages/visitors/pages/projects";
import Media from "../pages/visitors/pages/media";
import Advisory from "../pages/visitors/pages/advisory";
import Programs from "../pages/visitors/pages/programs";
import Report from "../pages/visitors/pages/report";
import Contact from "../pages/visitors/pages/contact_us";



export function VisitorRoutes(){

    return(
        <AdminProvider>
            <Routes>
                <Route  path="/" element={<Main />} >
                    <Route path="about-us"  element={<AboutUs/>}/>
                    <Route path="/"  element={<Home/>}/>
                    <Route path="/Research-Products"  element={<Projects/>}/>
                    <Route path="/Media-Center"  element={<Media/>}/>
                    <Route path="/Advisory"  element={<Advisory/>}/>
                    <Route path="/Programs"  element={<Programs/>}/>
                    <Route path="/Report/:id"  element={<Report/>}/>
                    <Route path="/Contact-us"  element={<Contact/>}/>

                </Route>
                
            </Routes>
        </AdminProvider>

    );
}
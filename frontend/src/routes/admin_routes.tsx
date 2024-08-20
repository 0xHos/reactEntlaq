import { Routes ,Route } from "react-router-dom";
import { AdminProvider } from "../context/adminContext";
import Login from "../pages/admin/pages/login";
import Dashboard from "../pages/admin/dashboard";
import AddGallery from "../pages/admin/pages/add_gallery";
import Messages from "../pages/admin/pages/messages";
import AddCarousel from "../pages/admin/pages/add_carousel";
import SectionView from "../pages/admin/section_view";
import AddReport from "../pages/admin/pages/add_report";
import Update from "../pages/admin/pages/update";
import Reports from "../pages/admin/pages/reports";
import Galleries from "../pages/admin/pages/galleries";

export function AdminRoutes(){

    return(
        <AdminProvider>
            <Routes>
                <Route path="/admin" element={<Login />} />
                <Route  path="/admin/dashboard" element={<Dashboard />} >
                    <Route path="add_in_gallery"  element={<AddGallery/>}/>
                    <Route path="add_report" element={<AddReport/>}/>
                    <Route path="reports" element={<Reports/>}/>
                    <Route path="galleries" element={<Galleries/>}/>
                    <Route path="messages" element={<Messages/>}/>
                    <Route path="add_in_section" element={<AddCarousel/>}/>
                    <Route path="view/:page/:section" element={<SectionView/>}/>
                    <Route path="update/:page/:section/:id" element={<Update/>}/>
                </Route>
                
            </Routes>
        </AdminProvider>

    );
}
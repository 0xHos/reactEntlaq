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
import GalleryEdite from "../pages/admin/pages/gallery_edit";
import ReportEdite from "../pages/admin/pages/report_edit";
import Subscription from "../pages/admin/pages/subscriptions";

export function AdminRoutes(){

    return(
        <AdminProvider>
            <Routes>
                <Route path="/admin" element={<Login />} />
                <Route  path="/admin/dashboard" element={<Dashboard />} >
                    <Route path="add_in_gallery"  element={<AddGallery/>}/>
                    <Route path="add_report" element={<AddReport/>}/>
                    <Route path="reports" element={<Reports/>}/>
                    <Route path="subscriptions" element={<Subscription/>}/>
                    <Route path="reports/edite/:id" element={<ReportEdite/>}/>

                    <Route path="galleries" element={<Galleries/>}/>
                    <Route path="galleries/edite/:id" element={<GalleryEdite/>}/>

                    <Route path="messages" element={<Messages/>}/>
                    <Route path="add_in_section" element={<AddCarousel/>}/>
                    <Route path="view/:page/:section" element={<SectionView/>}/>
                    <Route path="update/:page/:section/:id" element={<Update/>}/>
                </Route>
                
            </Routes>
        </AdminProvider>

    );
}
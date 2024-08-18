import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";
import { Navigate, Outlet } from "react-router-dom";
import AddCarousel from "./pages/add_carousel";
import SideNav from "./components/sideNav";



export default function Dashboard(){
    const adminContext = useContext(AdminContext);
    const token = adminContext?.token || sessionStorage.getItem("token");
    return(
        <>
            { 
            token ?
             <>
                <div className="flex w-full flex-row-reverse">
                    <section className="w-2/12 fixed left-0 bg-white h-screen shadow-lg">
                            <SideNav />
                    </section>
                    <section className="w-10/12 p-5 bg-slate-100 h-screen overflow-y-auto">
                        <section className="h-screen">
                                <Outlet />
                        </section>
                    </section>
                </div>
             </>
             
             : <Navigate to='/admin'/> }
        </>
    );
}

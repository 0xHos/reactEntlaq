import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";


export function Main(){

    return(
        <>
            <section>
                <Navbar />
            </section>
            <section className="pt-24">
                <Outlet />
            </section>
            <section>
                <Footer />
            </section>
        </>
    );
}
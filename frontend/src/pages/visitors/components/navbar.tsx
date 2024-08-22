import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Carousel } from "../../../types";
import { useAxiosGetData } from "../../../hooks/useFetch";
import { ENDPOINT_CAROUSEL } from "../../../config";



export function Navbar(){

    const [menuIsOpen,setMenuIsOpen] = useState(false);
    const [ent_prog_IsOpen,setEnt_prog_IsOpen] = useState(false);
    const [ent_proj_IsOpen,setEnt_proj_IsOpen] = useState(false);
    const [ent_media_IsOpen,setEnt_media_IsOpen] = useState(false);
    const [reports, setReports] = useState<Carousel[]>([]);
    const { getData } = useAxiosGetData();

    const styleMenuInMenu = "pl-4 text-sm font-normal mb-4";


    const fetchData = async () => {
        const res = await getData(`${ENDPOINT_CAROUSEL}/report/header`, '');
        setReports(res);
      };
    
      useEffect(() => {
        fetchData();
      }, []);

    const handleClickMenuIsOpen = ()=>{
        setMenuIsOpen(!menuIsOpen);
    }
    const handleClickEnt_prog_IsOpen = ()=>{
        setEnt_prog_IsOpen(!ent_prog_IsOpen);
    }
    const handleClickEnt_proj_IsOpen = ()=>{
        setEnt_proj_IsOpen(!ent_proj_IsOpen);
    }
    const handleClickEnt_media_IsOpen = ()=>{
        setEnt_media_IsOpen(!ent_media_IsOpen);
    }
    return(
        <>
         <nav className="flex flex-row items-center justify-between bg-slate-100 h-24 p-8 shadow-sm fixed w-full" style={{zIndex:100}}>
            <div className="flex">
                <button onClick={handleClickMenuIsOpen} className="text-blue-900"><FontAwesomeIcon icon={faBars}/></button>
            </div>
            <div className="flex">
                <a href="/"><img src="/img/logo.svg" className="h-12" alt="Logo"/></a>
            </div>
            <div className="md:flex">
                <a href="/Contact-Us" className="text-blue-900 hidden md:block">Contact Us</a>
            </div>
        </nav>

            {
                menuIsOpen?
                <div  className=" fixed top-24 w-full  h-screen bg-custom-white-menu" style={{zIndex:100}}>
                    <div className="text-blue-900  font-extrabold bg-slate-200 p-6 w-3/4  md:w-1/4 h-screen overflow-y-auto">
                        <ul className=" space-y-10">
                        <li><Link to={"about-us"}>About Us</Link></li>
                        <li className="font-extrabold"><button onClick={handleClickEnt_prog_IsOpen}><a href="/Programs">Entlaq Programs</a> <i className="fa-solid fa-angles-down"></i></button></li>
                                {
                                    ent_prog_IsOpen?
                                            <ul className="">
                                                <li className={styleMenuInMenu}><a href="/Programs#ourOfferings">Capacity Building Programs </a></li>
                                                <li className={styleMenuInMenu}><a href="/Programs#ourOfferings">Accelerator Startups </a></li>
                                                <li className={styleMenuInMenu}><a href="/Programs#Value_Added_Partners">Value Added Partners</a></li>
                                            </ul>
                                    :null
                                }
                            <li><Link to={"Advisory"}>Entlaq Advisory</Link></li>
                            <li className="font-extrabold"><button onClick={handleClickEnt_proj_IsOpen}><a href="/Programs">Projects </a> <i className="fa-solid fa-angles-down"></i></button></li>
                                {
                                    ent_proj_IsOpen?
                                            <ul className="">
                                                <li className= {`${styleMenuInMenu} `}><a href="/Research-Products" className="font-extrabold">Research Products</a></li>
                                                {
                                                    reports?.map(car=>(
                                                        <>
                                                         <li className={styleMenuInMenu}><a className="text-sm font-normal" href={`/Report/${car?.id}`}>{car?.car_title?.replace(/<[^>]*>/g, '')}</a></li>
                                                        </>
                                                    ))
                                                }
                                            </ul>
                                    :null
                                }

                            <li className="font-extrabold"><button onClick={handleClickEnt_media_IsOpen}><a href="/Media-Center">Media Center</a> <i className="fa-solid fa-angles-down"></i></button></li>
                                {
                                    ent_media_IsOpen?
                                            <ul className="">
                                                <li className={styleMenuInMenu}><a href="/Media-Center#news">News </a></li>
                                                <li className={styleMenuInMenu}><a href="/Media-Center#gallery">Gallery </a></li>
                                                <li className={styleMenuInMenu}><a href="/Media-Center#videos">Videos</a></li>
                                            </ul>
                                    :null
                                }   

                        </ul>
                    </div>
                       
                </div>
                
                :null
            }

        </>
    )

}
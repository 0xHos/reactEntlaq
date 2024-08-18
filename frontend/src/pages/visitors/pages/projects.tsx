import { useEffect,useState } from "react";
import { useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { Carousel } from "../../../types";

export default function Projects(){

    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/projects/research_products`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
    },[]);
    return(
        <>
            <div className="">
                        <p className="text-start text-customColor-blue text-2xl md:text-5xl font-extrabold pt-4 pl-10">
                            Research Products <br/>  
                            <span className="text-lg text-black font-normal">by Entlaq Holding</span>
                        </p>
            </div>
            <div className="flex flex-col md:flex-row w-full flex-wrap">
                {
                    carousel?.map((car)=>(
                        <div key={car?.id} className="flex flex-col w-full md:w-1/4  items-center">
                            <img src={`${BACKEND_SERVER}/uploads/${car.car_img}`} className="h-96 md:w-72  shadow-blue-900 shadow-md"/>
                            <a href={`${car?.car_link}`} className=" p-6  text-lg md:text-2xl w-fit ">Access Report <i className="text-gray-300 fa-solid fa-circle-chevron-right"></i></a>

                        </div>
                    ))
                }  
            </div>
        </>
    );
}


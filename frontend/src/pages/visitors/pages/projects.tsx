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
            <div className="flex flex-col md:flex-row w-full wow animate__animated animate__slideInLeft p-10"  data-wow-delay="0.5s" data-wow-duration="2s">
                {
                    carousel?.map((car)=>(
                        <div key={car?.id} className="flex flex-col w-full md:w-1/4 flex-wrap items-center">
                            <img src={`${BACKEND_SERVER}/uploads/${car.car_img}`} className="h-96 md:w-72 "/>
                            <a href={`${car?.car_link}`} className=" p-6  text-lg md:text-2xl w-fit ">Access Report <i className="text-gray-300 fa-solid fa-circle-chevron-right"></i></a>

                        </div>
                    ))
                }  
            </div>
        </>
    );
}

// <% for (let index = 0; index < carousels.research_products.length; index++) {%>
//     <div className="flex flex-col w-full md:w-1/4 flex-wrap items-center ">
//         <img src="uploads/<%= carousels.research_products[index].car_img%>" className="h-96 md:w-72 "/>
//         <a href="<%=carousels.research_products[index].car_link%>" className=" p-6  text-lg md:text-2xl w-fit ">Access Report <i className="text-gray-300 fa-solid fa-circle-chevron-right"></i></a>
//     </div>
// <% } %>
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { Carousel ,RportOrGallery} from "../../../types";
import { Swiper,SwiperSlide } from "swiper/react";
import 'swiper/css/grid';




const Header = ()=> {
    const { id } = useParams();
    const [carsouel, setCrsouel] = useState<Carousel>({});
    const [reports, setReports] = useState<RportOrGallery[]>([]);
    const {getData}= useAxiosGetData();

useEffect(() => {
    async function fetchData() {
        const res  = await getData(`${ENDPOINT_CAROUSEL}/report/header/${id}`,"");
        setCrsouel(res?.carousels);
    }

    fetchData();
}, []);

useEffect(() => {
    async function fetchData() {
        const res  = await getData(`${BACKEND_SERVER}/api/gallery/${id}`,"");
        setReports(res);
    }

    fetchData();
}, []);

    return(
        <>
            <div className="relative h-[80vh]">
                <img  className="h-full w-full object-cover" src={`${BACKEND_SERVER}/uploads/${carsouel?.car_img}`}/>
                <div className=" flex w-full h-full absolute z-10 top-0  bg-custom-opicty-blue p-10">
                    <div className="w-full md:w-2/3">
                        <h1 className="">{<div dangerouslySetInnerHTML={{__html:carsouel?.car_title}}></div>}</h1>
                        <p className="mt-10  text-white"><div dangerouslySetInnerHTML={{__html:carsouel?.car_content}}></div></p>
                        <div className=" mt-10 space-x-5">
                            <a className="px-16 bg-customColor-blue text-white py-5 font-bold" href={carsouel?.car_link}>Access Report</a>
                            <button> Lanuch Video</button>
                        </div>
                        {/* Partners: */}
                        <div className="absolute bottom-0">
                            <h1 className="text-white">Partners:</h1>
                            <div className="flex">
                                    {
                                        reports?.map((rep:RportOrGallery)=>(
                                            rep?.section == 'partners'?
                                                <img
                                                    className="size-32"
                                                     key={rep?.id} 
                                                     src={`${BACKEND_SERVER}/uploads/${rep?.car_img}`}/>
                                            :null
                                        ))
                                    }
                            </div>
                        </div>
                    </div>
                    {/* for image */}
                    <div className="w-full md:w-1/3  hidden md:flex">
                        <Swiper
                            modules={[]}
                            slidesPerView={1} // Show one slide at a time, with each slide containing a 2x2 grid
                            pagination={{ clickable: true }} // Optional: Add pagination
                        >
                            {
                                    reports?.map((rep: RportOrGallery, index: number) => {
                                        // Group reports in chunks of 4 to create the 2x2 grid
                                        const chunk = reports.slice(index * 4, index * 4 + 4);
                                        return (
                                            <SwiperSlide key={rep.id}>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {
                                                        chunk.map((item: RportOrGallery) => (
                                                            item?.section === 'header' && (
                                                                <img
                                                                    key={item.id}
                                                                    className="size-60"
                                                                    src={`${BACKEND_SERVER}/uploads/${item.car_img}`}
                                                                    alt="Image"
                                                                />
                                                            )
                                                        ))
                                                    }
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })
                            }
                        </Swiper>
                              
                    </div>
                </div>
            </div>
        </>
    );
}

const Videos =()=>{
    const { id } = useParams();
    const [reports, setReports] = useState<RportOrGallery[]>([]);
    const {getData}= useAxiosGetData();

    useEffect(() => {
        async function fetchData() {
            const res  = await getData(`${BACKEND_SERVER}/api/gallery/${id}`,"");
            setReports(res);
        }
    
        fetchData();
    }, []);

    return(
        <>
            <div className="p-10">
                 <h1 className="text-center text-customColor-blue text-4xl font-extrabold my-20">Videos</h1>

                <Swiper
                    slidesPerView={5}
                    spaceBetween={0}
                >
                        {
                             reports?.map((rep:RportOrGallery)=>(
                                rep?.section == 'header'?
                                    <SwiperSlide>
                                        <img
                                        className="h-72 w-52"
                                         key={rep?.id} 
                                         src={`${BACKEND_SERVER}/uploads/${rep?.car_img}`}/>
                                    </SwiperSlide>
                                :null
                            ))
                        }
                </Swiper>
            </div>
        </>
    );
}

const Insights =()=>{
    const { id } = useParams();
    const [reports, setReports] = useState<RportOrGallery[]>([]);
    const {getData}= useAxiosGetData();

    useEffect(() => {
        async function fetchData() {
            const res  = await getData(`${BACKEND_SERVER}/api/gallery/${id}`,"");
            setReports(res);
        }
    
        fetchData();
    }, []);

    return(
        <>
            <div className="p-10">
                 <h1 className="text-center text-customColor-blue text-4xl font-extrabold my-20">Insights</h1>

                <Swiper
                    slidesPerView={5}
                    spaceBetween={0}
                >
                        {
                             reports?.map((rep:RportOrGallery)=>(
                                rep?.section == 'header'?
                                    <SwiperSlide>
                                        <img
                                        className="h-72 w-52"
                                         key={rep?.id} 
                                         src={`${BACKEND_SERVER}/uploads/${rep?.car_img}`}/>
                                    </SwiperSlide>
                                :null
                            ))
                        }
                </Swiper>
            </div>
        </>
    );
}

const News =()=>{
    const { id } = useParams();
    const [reports, setReports] = useState<RportOrGallery[]>([]);
    const {getData}= useAxiosGetData();

    useEffect(() => {
        async function fetchData() {
            const res  = await getData(`${BACKEND_SERVER}/api/gallery/${id}`,"");
            setReports(res);
        }
    
        fetchData();
    }, []);

    return(
        <>
            <div className="p-10">
                 <h1 className="text-center text-customColor-blue text-4xl font-extrabold my-20">News</h1>

                <Swiper
                    slidesPerView={5}
                    spaceBetween={0}
                >
                        {
                             reports?.map((rep:RportOrGallery)=>(
                                rep?.section == 'header'?
                                    <SwiperSlide>
                                        <img
                                        className="h-72 w-52"
                                         key={rep?.id} 
                                         src={`${BACKEND_SERVER}/uploads/${rep?.car_img}`}/>
                                    </SwiperSlide>
                                :null
                            ))
                        }
                </Swiper>
            </div>
        </>
    );
}




export default function Report(){
   return(
    <>
        <Header />
        <Videos />
        <Insights />
        <News />
    </>
   );
}
import { Swiper, SwiperSlide } from "swiper/react";
import { Carousel } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { faArrowAltCircleRight, faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

function CarouselHeader(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/media_center/header`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
    },[]);

    return(
        <>
        <Swiper 
        className={`h-[88vh] relative` } 
        direction='vertical' 
        autoplay={{delay: 2000,disableOnInteraction: false, }}
        modules={[Autoplay, Navigation, Pagination]}  
        pagination={{
            el:".swiper-pagination",
            
        }} 
        navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}>
        {
                    carousel?.map(
                        (c:Carousel,index:number)=>(
                                <SwiperSlide key={index + 10}>
                                    <img className={`z-0 absolute object-cover w-full h-full'`} src={`${BACKEND_SERVER}/uploads/${c.car_img}`}/>
                                    <div className={`h-full bg-custom-black relative`}></div>
                                    <p className="w-full absolute bottom-32 text-2xl md:text-2xl text-center text-white  font-bold md:font-extrabold">{c.car_title}</p>
                                </SwiperSlide>

                    )
                    )
                }
                <h1 className='text-white font-extrabold text-5xl   text-center absolute top-1/2 left-[35%] z-10'>“Pushing the boundries<br/>of Egypt’s <span className="text-customColor-green">innovation</span>”</h1>
                <div className="swiper-pagination" style={{right:'3%'}}></div>
                <div className="swiper-button-next absolute bottom-28 right-16 z-10"><FontAwesomeIcon size='2x' className='text-[#1010118a]' icon={faArrowCircleLeft}/></div>
                <div className="swiper-button-prev absolute bottom-28 right-3 z-10"> <FontAwesomeIcon size='2x' className='text-[#1010118a]' icon={faArrowCircleRight}/></div>
        </Swiper>
        </>
    );
}


function News(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const [totalPage,setTotalPage] = useState(0);
    const {getData} = useAxiosGetData();
    const [page,setPage] = useState(1);
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/media_center/news/6/0`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
        getData(`${BACKEND_SERVER}/api/count/media_center/news`,'').then((res)=>{
            setTotalPage(Math.ceil((+res?.total/6)));
        });
    },[]);

    const handelGetNextCarouselPageination = ()=>{
        setPage(page+6);
        console.log(page);
        getData(`${ENDPOINT_CAROUSEL}/media_center/news/6/${page}`,'').then((res:Carousel[])=>{
            setCarousel([...res]);
        });
    }

    const handelGetPrevCarouselPageination = ()=>{
        setPage(page != 0? page-6:0);
        console.log(page);
        getData(`${ENDPOINT_CAROUSEL}/media_center/news/6/${page}`,'').then((res:Carousel[])=>{
            setCarousel([...res]);
        });
    }

    return(
        <>
            <div id="news" className="">
                <h1 className="text-center text-customColor-blue text-4xl font-extrabold mt-20">News</h1>
                    <div className="flex flex-wrap p-10">
                            {
                                carousel?.map((car)=>(
                                    <div key={car.id} className="w-[30%]  bg-customColor-blue m-6 shadow-2xl rounded-2xl">
                                            <img className="w-full h-96 object-cover rounded-t-2xl" src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                                            <h2 className="p-6 text-center text-white text-xl font-bold mt-4">{car?.car_title}</h2>    
                                    </div>
                                ))
                            }
                             <div className="w-full flex items-center justify-center" >

                                    <button onClick={handelGetPrevCarouselPageination} ><FontAwesomeIcon  icon={faArrowCircleLeft}/></button>
                                    <button onClick={handelGetNextCarouselPageination}><FontAwesomeIcon  icon={faArrowAltCircleRight}/></button>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                {
                                    Array.from({length: totalPage}, (_, i) => i + 1).map(page=>(
                                        <div key={page} className={`m-2 border-2 border-customColor-blue rounded-full text-center p-2 ${page===1?'border-t-4':''}`}>{page}</div>
                                    ))
                                }
                               
                            </div>
                    </div>
            </div>
        </>
    );
}

function Gallery(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const [totalPage,setTotalPage] = useState(0);
    const {getData} = useAxiosGetData();
    const [page,setPage] = useState(1);
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/media_center/gallery/6/0`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
        getData(`${BACKEND_SERVER}/api/count/media_center/gallery`,'').then((res)=>{
            setTotalPage(Math.ceil((+res?.total/6)));
        });
    },[]);

    const handelGetNextCarouselPageination = ()=>{
        setPage(page+6);
        console.log(page);
        getData(`${ENDPOINT_CAROUSEL}/media_center/gallery/6/${page}`,'').then((res:Carousel[])=>{
            setCarousel([...res]);
        });
    }

    const handelGetPrevCarouselPageination = ()=>{
        setPage(page != 0? page-6:0);
        console.log(page);
        getData(`${ENDPOINT_CAROUSEL}/media_center/gallery/6/${page}`,'').then((res:Carousel[])=>{
            setCarousel([...res]);
        });
    }

    return(
        <>
            <div id="gallery" className="">
                <h1 className="text-center text-customColor-blue text-4xl font-extrabold mt-20">Gallery</h1>
                    <div className="flex flex-wrap p-10">
                            {
                                carousel?.map((car)=>(
                                    <div key={car.id} className="w-[30%]  bg-customColor-blue m-6 shadow-2xl rounded-2xl">
                                            <img className="w-full h-96 object-cover rounded-t-2xl" src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                                            <h2 className="p-6 text-center text-white text-xl font-bold mt-4">{car?.car_title}</h2>    
                                    </div>
                                ))
                            }
                             <div className="w-full flex items-center justify-center" >

                                    <button onClick={handelGetPrevCarouselPageination} ><FontAwesomeIcon  icon={faArrowCircleLeft}/></button>
                                    <button onClick={handelGetNextCarouselPageination}><FontAwesomeIcon  icon={faArrowAltCircleRight}/></button>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                {
                                    Array.from({length: totalPage}, (_, i) => i + 1).map(page=>(
                                        <div key={page} className={`m-2 border-2 border-customColor-blue rounded-full text-center p-2 ${page===1?'border-t-4':''}`}>{page}</div>
                                    ))
                                }
                               
                            </div>
                    </div>
            </div>
        </>
    );
}


function Videos(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const [totalPage,setTotalPage] = useState(0);
    const {getData} = useAxiosGetData();
    const [page,setPage] = useState(1);
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/media_center/videos/6/0`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
        getData(`${BACKEND_SERVER}/api/count/media_center/videos`,'').then((res)=>{
            setTotalPage(Math.ceil((+res?.total/6)));
        });
    },[]);

    const handelGetNextCarouselPageination = ()=>{
        setPage(page+6);
        console.log(page);
        getData(`${ENDPOINT_CAROUSEL}/media_center/videos/6/${page}`,'').then((res:Carousel[])=>{
            setCarousel([...res]);
        });
    }

    const handelGetPrevCarouselPageination = ()=>{
        setPage(page != 0? page-6:0);
        console.log(page);
        getData(`${ENDPOINT_CAROUSEL}/media_center/videos/6/${page}`,'').then((res:Carousel[])=>{
            setCarousel([...res]);
        });
    }

    return(
        <>
            <div id="videos" className="">
                <h1 className="text-center text-customColor-blue text-4xl font-extrabold mt-20">Videos</h1>
                    <div className="flex flex-wrap p-10">
                            {
                                carousel?.map((car)=>(
                                    <div key={car.id} className="w-[30%]  bg-customColor-blue m-6 shadow-2xl rounded-2xl">
                                            <img className="w-full h-96 object-cover rounded-t-2xl" src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                                            <h2 className="p-6 text-center text-white text-xl font-bold mt-4">{car?.car_title}</h2> 
                                    </div>
                                ))
                            }
                             <div className="w-full flex items-center justify-center" >

                                    <button onClick={handelGetPrevCarouselPageination} ><FontAwesomeIcon  icon={faArrowCircleLeft}/></button>
                                    <button onClick={handelGetNextCarouselPageination}><FontAwesomeIcon  icon={faArrowAltCircleRight}/></button>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                {
                                    Array.from({length: totalPage}, (_, i) => i + 1).map(page=>(
                                        <div key={page} className={`m-2 border-2 border-customColor-blue rounded-full text-center p-2 ${page===1?'border-t-4':''}`}>{page}</div>
                                    ))
                                }
                               
                            </div>
                    </div>
            </div>
        </>
    );
}


export default function Media(){
    return(
        <>
            <CarouselHeader/>
            <News/>
            <Gallery/>
            <Videos/>
        </>
    );
}
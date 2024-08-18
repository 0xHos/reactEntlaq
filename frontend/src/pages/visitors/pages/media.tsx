import { Swiper, SwiperSlide } from "swiper/react";
import { Carousel } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { faArrowAltCircleRight, faArrowCircleLeft, faChevronCircleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons/faChevronCircleLeft";
import AOS from 'aos';
import Gallery from "./components/media/gallery";



interface JokerVideo{
    url:string;
}


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
        data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000"

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
                                    <img className={`z-0 absolute object-cover w-full  h-[100%]'`} style={{height:'100%'}} src={`${BACKEND_SERVER}/uploads/${c.car_img}`}/>
                                    <div className={`h-full bg-custom-black relative`}></div>
                                </SwiperSlide>

                    )
                    )
                }
                <h1 className='text-white font-extrabold text-3xl md:text-5xl  text-center absolute top-1/2 left-[25%] md:left-[35%] z-10'>“Pushing the boundries<br/>of Egypt’s <span className="text-customColor-green">innovation</span>”</h1>
                <div className="swiper-pagination" style={{right:'3%'}}></div>
                <div className="swiper-button-next absolute bottom-28 right-16 z-10"><FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleLeft}/></div>
                <div className="swiper-button-prev absolute bottom-28 right-3 z-10"> <FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleRight}/></div>
        </Swiper>
        </>
    );
}



function News(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const [totalPage,setTotalPage] = useState(0);
    const {getData} = useAxiosGetData();
    const [page,setPage] = useState(0);
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/media_center/news/6/${page}`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
        getData(`${BACKEND_SERVER}/api/count/media_center/news`,'').then((res)=>{
            setTotalPage(Math.ceil((+res?.total/6)));
        });
    },[]);

    const handelGetNextCarouselPageination = ()=>{
        if(page < (totalPage*6)){

            setPage(page+6);
            getData(`${ENDPOINT_CAROUSEL}/media_center/news/6/${page}`,'').then((res:Carousel[])=>{
                console.log(`${ENDPOINT_CAROUSEL}/media_center/news/6/${page}`)
                setCarousel(res);
            });
        }
        
    }

    const handelGetPrevCarouselPageination = ()=>{       
        if(page > 0 || page==0){
            setPage(page-6);
            getData(`${ENDPOINT_CAROUSEL}/media_center/news/6/${page}`,'').then((res:Carousel[])=>{
                console.log(`${ENDPOINT_CAROUSEL}/media_center/news/6/${page}`)
                setCarousel(res);
            });
        }else{
            setPage(0);
        }

    }
    return(
        <>
            <div id="news" className="">
                <h1 className="text-center text-customColor-blue text-4xl font-extrabold mt-20">News</h1>
                    <div className="flex flex-col md:flex-row flex-wrap p-10">
                            {
                                carousel?.map((car)=>(
                                    <div key={car.id} className="w-full md:w-[30%]  bg-customColor-blue mt-6 md:m-6 shadow-2xl rounded-2xl">
                                            <img className="w-full h-96 object-cover rounded-t-2xl" src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                                            <h2 className="p-6 text-center text-white text-xl font-bold mt-2">{car?.car_title}</h2>    
                                    </div>
                                ))
                            }
                             <div className="w-full flex items-center justify-center mt-14 space-x-2" >

                                    <button onClick={handelGetPrevCarouselPageination} ><FontAwesomeIcon className="text-slate-400" size="2x"  icon={faChevronCircleLeft}/></button>
                                    <button onClick={handelGetNextCarouselPageination}><FontAwesomeIcon  className="text-slate-400" size="2x" icon={faChevronCircleRight}/></button>
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
    const [page,setPage] = useState(0);

    const [showPopup, setShowPopup] = useState(false);
    const [joker,setJoker] = useState<string>('')
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
    const Popup = ({img})=>{
        const url = img?.split("?v=")[1]
     
        return(
            <div className="fixed top-0 h-screen w-screen bg-custom-black" style={{zIndex:'50'}}>
                <div className="size-80 bg-white flex flex-col items-center justify-center m-6 md:m-60 p-10 rounded-lg">
                <iframe src={`https://www.youtube.com/embed/${url}`} className='h-full w-full p-10' />

                    <FontAwesomeIcon onClick={()=>{setShowPopup(!showPopup)}} className="bg-red-800 text-white p-5 absolute top-[15%] right-[5%]" icon={faClose}/>
                </div>
            </div>
        )
    }
    
    const handelPopup = (event)=>{
        setShowPopup(!showPopup)
        const info:string = event.target.dataset.info;
        setJoker(info)
    }
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/media_center/videos/6/${page}`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
        getData(`${BACKEND_SERVER}/api/count/media_center/videos`,'').then((res)=>{
            setTotalPage(Math.ceil((+res?.total/6)));
        });
    },[]);

    const handelGetNextCarouselPageination = ()=>{
        if(page < (totalPage*6)){

            setPage(page+6);
            getData(`${ENDPOINT_CAROUSEL}/media_center/videos/6/${page}`,'').then((res:Carousel[])=>{
                console.log(`${ENDPOINT_CAROUSEL}/media_center/videos/6/${page}`)
                setCarousel(res);
            });
        }
        
    }

    const handelGetPrevCarouselPageination = ()=>{       
        if(page > 0 || page==0){
            setPage(page-6);
            getData(`${ENDPOINT_CAROUSEL}/media_center/videos/6/${page}`,'').then((res:Carousel[])=>{
                console.log(`${ENDPOINT_CAROUSEL}/media_center/videos/6/${page}`)
                setCarousel(res);
            });
        }else{
            setPage(0);
        }

    }
    return(
        <>
            <div id="videos" className="">
                <h1 className="text-center text-customColor-blue text-4xl font-extrabold mt-20">Videos</h1>
                    <div className="flex flex-col md:flex-row flex-wrap p-10">
                            {
                                carousel?.map((car)=>(
                                    <div key={car.id} className="w-full md:w-[30%]  bg-customColor-blue mt-6 md:m-6 shadow-2xl rounded-2xl">
                                            <img data-info={car?.car_link} onClick={handelPopup} className="w-full h-96 object-cover rounded-t-2xl" src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                                            <h2 className="p-6 text-center text-white text-xl font-bold mt-2">{car?.car_title}</h2>    
                                    </div>
                                ))
                            }
                             <div className="w-full flex items-center justify-center mt-14 space-x-2" >

                                    <button onClick={handelGetPrevCarouselPageination} ><FontAwesomeIcon className="text-slate-400" size="2x"  icon={faChevronCircleLeft}/></button>
                                    <button onClick={handelGetNextCarouselPageination}><FontAwesomeIcon  className="text-slate-400" size="2x" icon={faChevronCircleRight}/></button>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                {
                                    Array.from({length: totalPage}, (_, i) => i + 1).map(page=>(
                                        <div key={page} className={`m-2 border-2 border-customColor-blue rounded-full text-center p-2 ${page===1?'border-t-4':''}`}>{page}</div>
                                    ))
                                }
                               
                            </div>
                    </div>
                    {showPopup?<Popup img={joker} />:null}

            </div>
        </>
    );
}


export default function Media(){
    useEffect(() => {
        AOS.init({
          duration: 1200, // Animation duration in milliseconds
          once: true,     // Whether animation should happen only once while scrolling down
        });
      }, []);
    return(
        <>
            <CarouselHeader/>
            <News/>
            <Gallery/>
            <Videos/>
        </>
    );
}
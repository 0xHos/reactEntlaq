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
import { News } from "./components/media/news";
import { Videos } from "./components/media/videos";



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

        className={`h-[70vh] md:h-[88vh]relative` } 
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
                <h1 className='text-white font-extrabold text-3xl md:text-5xl  text-center absolute top-1/2 left-[10%] md:left-[35%] z-10'>“Pushing the boundries<br/>of Egypt’s <span className="text-customColor-green">innovation</span>”</h1>
                <div className="swiper-pagination" style={{right:'3%'}}></div>
                <div className="swiper-button-next absolute bottom-28 right-16 z-10 hidden md:flex"><FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleLeft}/></div>
                <div className="swiper-button-prev absolute bottom-28 right-3 z-10 hidden md:flex"> <FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleRight}/></div>
       </Swiper>
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
import { faChevronCircleLeft, faChevronCircleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { ENDPOINT_CAROUSEL, BACKEND_SERVER } from "../../../../../config";
import { useAxiosGetData } from "../../../../../hooks/useFetch";
import { Carousel } from "../../../../../types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";



interface JokerGallery{
    car_img:string;
}

export default function Gallery() {
    const init: Carousel[] = [];
    const [carousel, setCarousel] = useState(init);
    const [totalPage, setTotalPage] = useState(0);
    const { getData } = useAxiosGetData();
    const [page, setPage] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [galleryId, setGalleryId] = useState('');
    const refPage = useRef([]);
    const [light,setLight] = useState(page/6);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handelPopup = (event) => {
        const info: string = event.target.dataset.info;
        setGalleryId(info);
        togglePopup();
    };

    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/media_center/gallery/6/0`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
        getData(`${BACKEND_SERVER}/api/count/media_center/gallery`,'').then((res)=>{
            setTotalPage(Math.ceil((+res?.total/6)));
        });
    },[]);

    useEffect(()=>{
        console.log(page);
        getData(`${ENDPOINT_CAROUSEL}/media_center/gallery/6/${page}`,'').then((res:Carousel[])=>{
            if(res.length){
                setCarousel(res);
                setLight(page/6)

            }
        });
    },[page])

    const handelGetPrevCarouselPageination = ()=>{
        page <= 0?setPage(0):setPage(page-6);
        
    }
    const handelGetNextCarouselPageination = ()=>{
        page >= totalPage*6-6?setPage(totalPage*6-6):setPage(page+6);

    }

    return (
        <>
                        {showPopup && <Popup galleryId={galleryId} togglePopup={togglePopup} />}

            <div id="gallery" className="">
                <h1 className="text-center text-customColor-blue text-4xl font-extrabold mt-20">Gallery</h1>
                <div className="flex flex-col md:flex-row flex-wrap p-10">
                    {carousel?.map((car) => (
                        <div key={car.id} className="w-full md:w-[30%] bg-customColor-blue mt-6 md:m-6 shadow-2xl rounded-2xl">
                            <img
                                onClick={handelPopup}
                                data-info={car?.id}
                                className="w-full h-96 object-cover rounded-t-2xl"
                                src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}
                            />
                            <h2 className="p-6 text-center text-white text-xl font-bold mt-2">{<div dangerouslySetInnerHTML={{__html:car?.car_title}}></div>}</h2>
                            <h2 className=" text-center text-white text-xl font-mono ">{<div dangerouslySetInnerHTML={{__html:car?.car_content}}></div>}</h2>

                        </div>
                    ))}
                    <div className="w-full flex items-center justify-center mt-14 space-x-2" >

                        <button onClick={handelGetPrevCarouselPageination} ><FontAwesomeIcon className="text-slate-400" size="2x"  icon={faChevronCircleLeft}/></button>
                        <button onClick={handelGetNextCarouselPageination}><FontAwesomeIcon  className="text-slate-400" size="2x" icon={faChevronCircleRight}/></button>
                    </div>
                    <div className="w-full flex items-center justify-center">
                                {
                                    Array.from({length: totalPage}, (_, i) => i + 1).map((page,i)=>(
                                        <div ref={e =>{refPage.current.push(e)}} key={page} className={`${light == i? 'bg-customColor-blue text-white':''}  text-customColor-blue m-1 rounded-lg border-customColor-blue  border-x-customColor-blue text-center p-1 border-2  ${page===1?'':''}`}>{page}</div>
                                    ))
                                }
                    </div>
                </div>
            </div>
        </>
    );
}

function Popup({ galleryId, togglePopup }) {
    const { getData } = useAxiosGetData();
    const [joker, setJoker] = useState<JokerGallery[]>();

    useEffect(() => {
        getData(`${BACKEND_SERVER}/api/gallery/${galleryId}`, '').then((res: JokerGallery[]) => {
            setJoker(res);
        });
    }, [galleryId]);

    return (
        <div className="fixed top-0 w-[100%] h-[100%] bg-custom-black" style={{ zIndex: '50' }}>
           <Swiper
                className="relative top-[20%] md:left-[35%]"
                autoplay={{delay: 2000,disableOnInteraction: false, }}
                modules={[Autoplay, Navigation, Pagination]} 
                slidesPerView={1}
                centeredSlides={true} 
                loop={true}
                pagination={{
                    el:".swiper-pagination",
                    type:'fraction'
                    
                }} 
                navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
                >
                    {joker?.map((g, index) => (
                        <SwiperSlide key={index * 2}>
                            <img className="object-contain size-[30rem]" src={`${BACKEND_SERVER}/uploads/${g?.car_img}`} />
                        </SwiperSlide>
                    ))}

                <div className="swiper-pagination absolute bottom-0 text-white font-extrabold left-[50%] md:left-[15%]"></div>
                <div className="swiper-button-next absolute bottom-0 left-0  z-10"><FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleLeft}/></div>
                <div className="swiper-button-prev absolute bottom-0 right-0 md:left-96 z-10"> <FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleRight}/></div>
        
                </Swiper>
                <FontAwesomeIcon
                    onClick={togglePopup}
                    className="bg-red-800 text-white p-5 absolute top-[15%] right-0"
                    icon={faClose}
                />
        </div>
    );
}


import { faChevronCircleLeft, faChevronCircleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
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

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handelPopup = (event) => {
        const info: string = event.target.dataset.info;
        setGalleryId(info);
        togglePopup();
    };

    useEffect(() => {
        getData(`${ENDPOINT_CAROUSEL}/media_center/gallery/6/${page}`, '').then((res: Carousel[]) => {
            setCarousel(res);
        });
        getData(`${BACKEND_SERVER}/api/count/media_center/gallery`, '').then((res) => {
            setTotalPage(Math.ceil((+res?.total / 6)));
        });
    }, [page]);

    const handelGetNextCarouselPageination = () => {
        if (page < totalPage * 6) {
            setPage(page + 6);
        }
    };

    const handelGetPrevCarouselPageination = () => {
        if (page > 0 || page === 0) {
            setPage(page - 6);
        } else {
            setPage(0);
        }
    };

    return (
        <>
            <div id="news" className="">
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
                            <h2 className="p-6 text-center text-white text-xl font-bold mt-2">{car?.car_title}</h2>
                            <h2 className=" text-center text-white text-xl font-mono ">{car?.car_content}</h2>

                        </div>
                    ))}
                    <div className="w-full flex items-center justify-center mt-14 space-x-2">
                        <button onClick={handelGetPrevCarouselPageination}>
                            <FontAwesomeIcon className="text-slate-400" size="2x" icon={faChevronCircleLeft} />
                        </button>
                        <button onClick={handelGetNextCarouselPageination}>
                            <FontAwesomeIcon className="text-slate-400" size="2x" icon={faChevronCircleRight} />
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                            <div key={page} className={`m-2 border-2 border-customColor-blue rounded-full text-center p-2 ${page === 1 ? 'border-t-4' : ''}`}>{page}</div>
                        ))}
                    </div>
                </div>
                {showPopup && <Popup galleryId={galleryId} togglePopup={togglePopup} />}
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
                className="relative top-[20%] left-[35%]"
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

                <div className="swiper-pagination absolute bottom-0 text-white font-extrabold left-[15%]"></div>
                <div className="swiper-button-next absolute bottom-28 right-16 z-10"><FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleLeft}/></div>
                <div className="swiper-button-prev absolute bottom-28 right-3 z-10"> <FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleRight}/></div>
        
                </Swiper>
                <FontAwesomeIcon
                    onClick={togglePopup}
                    className="bg-red-800 text-white p-5 absolute top-[15%] right-0"
                    icon={faClose}
                />
        </div>
    );
}

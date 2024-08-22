import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { Carousel ,RportOrGallery} from "../../../types";
import { Swiper,SwiperSlide } from "swiper/react";
import 'swiper/css/grid';
import { Autoplay,Navigation,Pagination ,EffectCoverflow } from 'swiper/modules';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight, faClose, faPlayCircle } from "@fortawesome/free-solid-svg-icons";



const PopupVideo = ({galleryId,showPopup ,setShowPopup})=>{
    const [video_report_header , set_video_report_header] = useState("");
    const {getData}= useAxiosGetData();

    useEffect(()=>{
        async function fetchVedio() {
            const res  = await getData(`${BACKEND_SERVER}/api/gallery/${galleryId}`,"");
            res?.map((r)=>{
                if(r.section == 'video_report_header'){
                    console.log(r.car_img);
                    set_video_report_header(r?.car_img);
                }
            })
        }
        fetchVedio();
    },[])

    return(
       <>
        {
            showPopup? 
            <div className="fixed top-0 h-screen w-screen bg-custom-black" style={{zIndex:'50'}}>
                <div className="size-96 bg-white flex flex-col items-center justify-center m-6 md:m-60 p-10 rounded-lg">
                        <video controls>
                        <source src={`${BACKEND_SERVER}/uploads/${video_report_header}`} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                    <FontAwesomeIcon onClick={()=>{setShowPopup(!showPopup)}} className="bg-red-800 text-white p-5 absolute top-[15%] right-[5%]" icon={faClose}/>
                </div>
            </div>
            :null
        }
       </>
    );
}

const PopupForm = ({galleryId,showPopup})=>{
    const [report_report_header , set_report_report_header] = useState("");
    const {getData}= useAxiosGetData();

    useEffect(()=>{
        async function fetchVedio() {
            const res  = await getData(`${BACKEND_SERVER}/api/gallery/${galleryId}`,"");
            res?.map((r)=>{
                if(r.section == 'report_report_header'){
                    console.log(r.car_img);
                    set_report_report_header(r?.car_img);
                }
            })
        }
        fetchVedio();
    },[])
    return (
        <>
          {showPopup ? (
        <div className="fixed top-0 h-screen w-screen bg-custom-black" style={{zIndex:'50'}}>
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md  relative top-[20%] rounded-xl">
              <form className="space-y-4" action={`${BACKEND_SERVER}/subscription/`} method="POST">
                <input type="hidden" name="reportId" value={report_report_header} />
                {/* First Name */}
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first_name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First Name"
                  />
                </div>
      
                {/* Last Name */}
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last_name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last Name"
                  />
                </div>
                 {/* Phone */}
                 <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="phone"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Phone"
                  />
                </div>
                 {/* position */}
                 <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    position
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="position"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="position"
                  />
                </div>
      
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
      
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            </div>

          ) : null}
        </>
      );
      
}


const Header = ()=> {
    const { id } = useParams();
    const [carsouel, setCrsouel] = useState<Carousel>({});
    const [reports, setReports] = useState<RportOrGallery[]>([]);
    const {getData}= useAxiosGetData();
    const [video_report_header , set_video_report_header] = useState("");
    const [report_report_header , set_report_report_header] = useState("");

    const [showPopup,setShowPopup] = useState(false);
    const [showPopupReoportForm,setShowPopupReoportForm] = useState(false);


useEffect(() => {
    async function fetchData() {
        const res  = await getData(`${ENDPOINT_CAROUSEL}/report/header/${id}`,"");
        setCrsouel(res?.carousels);
    }
    async function fetchDataGallery() {
        const res  = await getData(`${BACKEND_SERVER}/api/gallery/${id}`,"");
        setReports(res);
        reports.map((r)=>{
            console.log(r);
            if(r.section == "video_report_header"){
                    set_video_report_header(r.car_img)
            }else if(r.section == "report_report_header"){
                    set_report_report_header(r.car_img);
            }
        })
    }

    fetchData();
    fetchDataGallery();
}, []);





    return(
        <>
            {showPopupReoportForm? <PopupForm showPopup={showPopupReoportForm} galleryId={id}/>:null}
            <div className="relative h-[160vh]  xl:h-[90vh]">
                <img  className="h-full w-full object-cover" src={`${BACKEND_SERVER}/uploads/${carsouel?.car_img}`}/>
                <div className=" flex-col w-full h-full absolute z-10 top-0  bg-custom-opicty-blue p-10">
                    <div className="w-full flex-col xl:flex-row">
                            <div className="flex flex-col xl:flex-row space-y-7">

                            <div className="w-full xl:w-2/3">
                                <h1 className="">{<div dangerouslySetInnerHTML={{__html:carsouel?.car_title}}></div>}</h1>
                                <p className="mt-10  text-white"><div dangerouslySetInnerHTML={{__html:carsouel?.car_content?.slice(0,850)}}></div></p>
                                <div className=" mt-10 space-x-5">
                                    <button className="px-16 bg-customColor-blue text-white py-5 font-bold" onClick={()=>{setShowPopupReoportForm(!showPopupReoportForm)}}>Access Report</button>
                                    <button className="font-bold text-lg text-white" onClick={()=>{setShowPopup(!showPopup)}}> <FontAwesomeIcon size="2x" icon={faPlayCircle}/> <span className="relative bottom-2">Lanuch Video</span></button>
                                </div>
                            </div>
                            <div className="w-full xl:w-1/3">
                                        <Swiper
                                             slidesPerView={3}
                                             spaceBetween={10}
                                             autoplay={{delay: 2000,disableOnInteraction: false, }}
                                             modules={[Autoplay, Navigation]}  
                                             navigation={{
                                             nextEl: '.swiper-button-next',
                                             prevEl: '.swiper-button-prev',
                                           }}
                                           breakpoints={{
                                            500:{
                                                slidesPerView:2
                                            }
                                           }}
                                            
                                              
                                           
                                        >
                                        {
                                                reports?.map((rep:RportOrGallery)=>(
                                                    rep?.section == 'header'?
                                                        <SwiperSlide>
                                                            <img
                                                            className="h-72 w-52 rounded-lg"
                                                            key={rep?.id} 
                                                            src={`${BACKEND_SERVER}/uploads/${rep?.car_img}`}/>
                                                        </SwiperSlide>
                                                    :null
                                                ))
                                        }
                                            <div className="swiper-button-next relative top-8"><FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleLeft}/></div>
                                            <div className="swiper-button-prev relative  left-16 "> <FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleRight}/></div>
        
                                        </Swiper>
                            </div>
                            </div>
                    </div>
                    <h1 className="text-white font-bold mt-20">Partners:</h1>
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={true}
                        slidesPerView={5}
                    >
                        {
                                    reports?.map((rep:RportOrGallery)=>(
                                        rep?.section == 'partners'?
                                            <SwiperSlide key={rep?.id}>
                                                <img className="size-28" src={`${BACKEND_SERVER}/uploads/${rep?.car_img}`}/>
                                            </SwiperSlide>
                                        :null
                                    ))
                        }
                    </Swiper>
                </div>
               {
                    showPopup?<PopupVideo galleryId={id} setShowPopup={setShowPopup} showPopup={showPopup} url={video_report_header}/>:null
               }
            </div>
        </>
    );
}

const Videos =()=>{
    const { id } = useParams();
    const [reports, setReports] = useState<RportOrGallery[]>([]);
    const {getData}= useAxiosGetData();
    const [showPopup,setShowPopup] = useState(false);
    const [joker,setJoker] = useState("");


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
                    slidesPerView={4}
                    spaceBetween={10}
                    breakpoints={{
                        500:{
                            slidesPerView:1,
                            spaceBetween:1

                        },
                        600:{
                            slidesPerView:2,
                            spaceBetween:5

                        },
                        700:{
                            slidesPerView:3,
                            spaceBetween:10
                        },
                        1000:{
                            slidesPerView:4,
                            spaceBetween:10
                        }
                    }}
                >
                        {
                             reports?.map((rep:RportOrGallery)=>(
                                rep?.section == 'videos'?
                                    <SwiperSlide key={rep?.id }>
                                        <div className="relative">
                                            <video
                                             className="h-96 w-80 object-cover"
                                             src={`${BACKEND_SERVER}/uploads/${rep?.car_img}`}/>
                                             <FontAwesomeIcon  onClick={()=>{setShowPopup(!showPopup);setJoker(rep?.car_img)}} className="absolute top-1/2 left-[33%] text-blue-800 shadow-2xl" size="4x" icon={faPlayCircle}/> 
                                    </div>
                                    {                               
                                    }
                                    </SwiperSlide>
                                :null
                            ))
                            
                        }
                </Swiper>
               {
                
                showPopup?<PopupVideo setShowPopup={setShowPopup} showPopup={showPopup} url={`${BACKEND_SERVER}/uploads/${joker}`}/>:null

               }
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
                    autoplay={true}
                    modules={[Autoplay]}
                    slidesPerView={5}
                    spaceBetween={0}
                    breakpoints={{
                        500:{
                            slidesPerView:1,
                            spaceBetween:1

                        },
                        600:{
                            slidesPerView:2,
                            spaceBetween:5

                        },
                        700:{
                            slidesPerView:3,
                            spaceBetween:10
                        },
                        1000:{
                            slidesPerView:4,
                            spaceBetween:10
                        }
                    }}
                >
                        {
                             reports?.map((rep:RportOrGallery)=>(
                                rep?.section == 'insights'?
                                    <SwiperSlide>
                                        <img
                                        className="h-96 w-80"
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
                    autoplay={true}
                    modules={[Autoplay]}
                    breakpoints={{
                        500:{
                            slidesPerView:1,
                            spaceBetween:1,

                        },
                        600:{
                            slidesPerView:2,
                            spaceBetween:5

                        },
                        700:{
                            slidesPerView:3,
                            spaceBetween:10
                        },
                        1000:{
                            slidesPerView:4,
                            spaceBetween:10
                        }
                    }}
                >
                        {
                             reports?.map((rep:RportOrGallery)=>(
                                rep?.section == 'news'?
                                    <SwiperSlide>
                                        <img
                                        className="h-96 w-80"
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
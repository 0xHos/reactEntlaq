import { Swiper, SwiperSlide } from "swiper/react";
import { Carousel } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { faChevronCircleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons/faChevronCircleLeft";
import AOS from 'aos';


interface Joker {
    img:string;
    title:string;
    content:string;
}

function CarouselHeader(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/about_us/header`,'').then((res:Carousel[])=>{
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


function VisionAndMission(){
    return(
        <>
                    <div className="flex flex-col lg:flex-row h-64" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000">
                        <div className="py-7 h-full w-full lg:w-1/2 bg-customColor-blue  flex flex-col justify-center items-center wow animate__animated animate__slideInLeft" data-wow-delay="0.5s" data-wow-duration="2s">
                            <h1 className="text-white text-lg md:text-4xl font-extrabold text-center">Vision</h1>
                            <p className="text-white text-center p-2">Catalyzing Egypt’s positioning as the region’s<br/> innovation hub through fostering an <span className="text-customColor-yellow font-bold">innovative</span>, <br/><span className="text-customColor-yellow font-bold">inclusive</span>, and <span className="text-customColor-yellow font-bold">impactful</span> ecosystem.</p>        
                        </div>
                        <div  data-aos="fade-right" data-aos-duration="1000" data-aos-delay="1000" className="py-7 h-full w-full lg:w-1/2 bg-gray-200 flex flex-col justify-center items-center space-y-4 py-4 wow animate__animated animate__slideInRight" data-wow-delay="0.5s" data-wow-duration="2s">
                            <span className="text-customColor-blue text-lg md:text-4xl font-extrabold">Mission</span>
                            <p className="text-customColor-blue text-center p-2">Curate talent, sustainable practices, and data<br/> driven solutions to cement entrepreneurial growth.</p>
                        </div>
                    </div>
                    
                   

        </>
    );
}


function MessageCEO(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/about_us/message_ceo`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
    },[]);
    return(
        <>
            <p className="font-extrabold text-center text-1xl md:text-5xl  text-customColor-blue p-12 bg-white">A Message from  Entlaq’s CEO</p>
<div className="flex flex-col md:flex-row  md:flex-wrap bg-gray-100 wow animate__animated animate__slideInUp pb-10">
    {/* <!-- img --> */}
    <div className='w-full flex items-center justify-center lg:w-1/3 '>
        <div className="relative">
            <div className='size-20 bg-blue-950 absolute -bottom-8 -left-2 hidden lg:flex animate-bounce'></div>
            <div className='size-20 bg-blue-500 absolute -bottom-11 -left-6 z-0 hidden lg:flex animate-bounce'></div>
        </div>
        <img  src={`${BACKEND_SERVER}/uploads/${carousel[0]?.car_img}`} className='car_img rounded-full lg:rounded-none lg:rounded-tl-3xl lg:rounded-br-3xl z-50 relative w-44 h-44 lg:w-72 lg:h-96 xl:w-[28rem] xl:h-[30rem]'/>
    </div>

    {/* <!-- name --> */}
    <div className="w-full text-center md:w-2/3  top-1/2 translate-y-1/2">
        <p className="text-center md:text-center text-lg md:text-2xl  ">
            <span className="text-customColor-blue font-extrabold text-lg  md:text-5xl">Mohamed Ehab</span><br/>
            <span className="text-gray-700 text-sm md:text-2xl">Co-founder & CEO of Entlaq</span>
        </p>
    </div>

    {/* <!-- name and message --> */}
   <div className="flex flex-wrap w-full justify-center items-start md:mt-28 ">
     {/* <!-- name --> */}
     <div className=" md:w-1/3  hidden md:flex">
        <p className="w-full text-start md:text-center text-lg md:text-2xl ">
            <span className="text-gray-700 mx-6">Co-founder & CEO of Entlaq</span><br/>
            <span className="text-customColor-blue font-extrabold text-1xl">Mohamed Ehab </span>
        </p>
    </div>

    
    <p className="w-full md:w-2/3  text-base py-10 p-4 md:text-2xl md:p-2 md:mt-6">
            {carousel[0]?.car_content}
    </p>
   </div>
        

</div>

      
                   
        </>
    
    );
}



function CoFounders(){


    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    const [showPopup, setShowPopup] = useState(false);
    const [joker,setJoker] = useState<Joker>()
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
    const Popup = ({img,title,content})=>{
        return(
            <div className="fixed top-0 w-[100%] h-[100%] bg-custom-black" style={{zIndex:'50'}}>
                <div className="bg-white flex flex-col items-center justify-center m-6 md:m-60 p-10 rounded-lg">
                    <img className="size-40 rounded-full" src={`${BACKEND_SERVER}/uploads/${joker?.img}`}/>
                    <h1 className="font-extrabold">{title}</h1>
                    <p>{content}</p>
                    <FontAwesomeIcon onClick={()=>{setShowPopup(!showPopup)}} className="bg-red-800 text-white p-5 absolute top-0 right-0" icon={faClose}/>
                </div>
            </div>
        )
    }
    
    const handelPopup = (event)=>{
        setShowPopup(!showPopup)
        const info:string = event.target.dataset.info;
        info.split(';')
        const [img,title,content] = info.split(';');
        setJoker({img:img,title:title,content:content})
    }
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/about_us/co_founders`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
    },[]);
    const coFounders = [
        {   
            id:carousel[0]?.id,
            name:carousel[0]?.car_name,
            job:carousel[0]?.car_job,
            linkdin:carousel[0]?.car_link,
            bio:carousel[0]?.car_content,
            img:carousel[0]?.car_img,
            jobColor:"text-white",
            bgColor:"bg-customColor-blue",
            nColor:"text-customColor-green",
            cColor:"bg-blue-500",
            linkdinColor:"bg-customColor-green",
        },
        {
            name:carousel[1]?.car_name,
            job:carousel[1]?.car_job,
            linkdin:carousel[1]?.car_link,
            bio:carousel[1]?.car_content,
            img:carousel[1]?.car_img,
            jobColor:"",
            bgColor:"bg-gray-200",
            nColor:"text-customColor-blue",
            cColor:"bg-blue-950",
            linkdinColor:"bg-blue-500",
           
        },
        {
            name:carousel[2]?.car_name,
            job:carousel[2]?.car_job,
            linkdin:carousel[2]?.car_link,
            bio:carousel[2]?.car_content,
            img:carousel[2]?.car_img,
            jobColor:"",
            bgColor:"bg-gray-200",
            nColor:"text-blue-900",
            cColor:"bg-blue-950",
            linkdinColor:"bg-blue-500",
        },
    
        {   name:carousel[3]?.car_name,
            job:carousel[3]?.car_job,
            linkdin:carousel[3]?.car_link,
            bio:carousel[3]?.car_content,
            img:carousel[3]?.car_img,
            jobColor:"text-white",
            bgColor:"bg-customColor-blue",
            nColor:"text-customColor-green",
            cColor:"bg-blue-500",
            linkdinColor:"bg-customColor-green",
        },
    ]

  
    return(
        <>
   

<div id="co-founder" className="">
    <p className="p-12 bg-white  text-customColor-green font-extrabold text-2xl md:text-5xl text-center">Meet Our Co-founders</p>
    <div className="flex flex-col md:flex-wrap md:flex-row space-y-20 md:space-y-0 w-full wow animate__animated animate__lightSpeedInRight">
        {coFounders?.map((c)=>(
            <>
                <div className={`"w-full md:w-1/2 flex flex-col justify-center items-center space-y-10 ${c.bgColor} py-10 md:shadow-2xl md:shadow-none shadow-black group"`}>

                    <div className='relative'>
                        <div className={ `md:size-20 ${c.cColor}  absolute -bottom-8 -left-6 hidden md:flex  animate-bounce`}></div>
                        <div className={`md:size-20 ${c.linkdinColor} absolute -bottom-10 -left-12 z-0 hidden md:flex animate-bounce`}></div>
                        <div className='md:size-20 absolute -bottom-16 -left-6 z-50  hidden md:flex '><a href={c.linkdin}><i className="fa-brands fa-linkedin text-4xl text-white"></i></a></div>
                        <img data-info={`${c.img};${c.name};${c.bio}`} src={`${BACKEND_SERVER}/uploads/${c.img}`} onClick={handelPopup} className='car_img rounded-full md:rounded-none md:rounded-tl-3xl md:rounded-br-3xl z-50 relative shadow-none border-2 border-white md:shadow-2xl md:shadow-black w-24 h-24 md:w-80 md:h-96 group-hover:z-0'/>
                     </div>

                    <div>
                        <p id="" className={`text-center font-extrabold text-lg ${c.nColor}`}><a href={c.linkdin}>{c.name}</a> </p>
                        <p className={`w-full text-center text-lg ${c.jobColor}`}>{c.job}</p>
                    </div>
                </div>
            </>
        ))}
            
           
            {showPopup?<Popup img={joker?.img} title={joker?.title} content={joker?.content} />:null}
    </div>
</div>
        
        </>
    );
}

function Team(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    const [showPopup, setShowPopup] = useState(false);
    const [joker,setJoker] = useState<Joker>()
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
    const Popup = ({img,title,content})=>{
        return(
            <div className="fixed top-0 w-[100%] h-[100%] bg-custom-black" style={{zIndex:'50'}}>
                <div className="bg-white flex flex-col items-center justify-center m-6 md:m-60 p-10 rounded-lg">
                    <img className="size-40 rounded-full" src={`${BACKEND_SERVER}/uploads/${joker?.img}`}/>
                    <h1 className="font-extrabold">{title}</h1>
                    <p>{content}</p>
                    <FontAwesomeIcon onClick={()=>{setShowPopup(!showPopup)}} className="bg-red-800 text-white p-5 absolute top-0 right-0" icon={faClose}/>
                </div>
            </div>
        )
    }
    
    const handelPopup = (event)=>{
        setShowPopup(!showPopup)
        const info:string = event.target.dataset.info;
        info.split(';')
        const [img,title,content] = info.split(';');
        setJoker({img:img,title:title,content:content})
    }
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/about_us/team`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
    },[]);

    return(
        <>
            <div id="team">
            <p className="p-12  text-customColor-blue font-extrabold  text-3xl md:text-5xl text-center">Meet the Team</p>
            <div className="flex flex-col md:flex-wrap md:flex-row space-y-20 md:space-y-0 w-full wow animate__animated animate__lightSpeedInRight">
               {
                carousel?.map((car)=>(
                    <div className="w-full md:w-1/3 flex flex-col justify-center items-center space-y-10  py-10 md:shadow-2xl md:shadow-none shadow-black group wow animate__animated animate__lightSpeedInRight">

                    <div className='relative'>
                        <div className='md:size-20 bg-blue-950 absolute -bottom-8 -left-6 hidden md:flex animate-bounce'></div>
                        <div className='md:size-20 bg-blue-500 absolute -bottom-10 -left-12 z-0 hidden md:flex animate-bounce'></div>
                        <div className='md:size-20 absolute -bottom-16 -left-6 z-50 hidden md:flex '><a href={car?.car_link}><i className="fa-brands fa-linkedin text-4xl"></i></a></div>
                        <img onClick={handelPopup} data-info={`${car?.car_img};${car?.car_name};${car?.car_content}`} src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}   className='car_img object-left-bottom rounded-full md:rounded-none md:rounded-tl-3xl md:rounded-br-3xl z-50 relative shadow-none border-2 border-white md:shadow-2xl md:shadow-black w-24 h-24 md:w-56 md:h-64 group-hover:z-0'/>
                    </div>
                    <div>
                        <p className="text-center font-bold text-lg text-customColor-blue"> <a href={car?.car_link}>{car?.car_name}</a></p>
                        <p className="text-center text-sm text-customColor-blue">{car?.car_job}</p>
                    </div>
                </div>
                ))
               }
              
              {showPopup?<Popup img={joker?.img} title={joker?.title} content={joker?.content} />:null}

            </div>
            </div>
        </>
    );
}

export function AboutUs(){
    useEffect(() => {
        AOS.init({
          duration: 1200, // Animation duration in milliseconds
          once: true,     // Whether animation should happen only once while scrolling down
        });
      }, []);
    return(
        <>
            <CarouselHeader />
            <VisionAndMission />
            <MessageCEO />
            <CoFounders/>
            <Team />
           
        </>
    );
}
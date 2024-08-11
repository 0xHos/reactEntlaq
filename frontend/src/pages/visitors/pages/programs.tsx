import { Swiper, SwiperSlide } from "swiper/react";
import { Carousel } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { faAngleDoubleRight, faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
 
function CarouselHeader(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/programs/header`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
    },[]);

    return(
        <>
        <Swiper 
        className={`h-full relative` } 
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
                                    <a className="absolute bottom-4 left-[44%] py-4  px-16 z-10 bg-customColor-blue rounded-full w-fit text-lg  car_link font-bold text-white  hover:border-2 hover:border-customColor-blue hover:bg-transparent transform transition-transform duration-200 ease-in-out hover:-translate-y-0.5  hover:cursor-pointer" href={`${c.car_link}`}>learn more</a>
                                </SwiperSlide>

                    )
                    )
                }
                <div className="swiper-pagination" style={{right:'3%'}}></div>
                <div className="swiper-button-next absolute bottom-28 right-16 z-10"><FontAwesomeIcon size='2x' className='text-[#1010118a]' icon={faArrowCircleLeft}/></div>
                <div className="swiper-button-prev absolute bottom-28 right-3 z-10"> <FontAwesomeIcon size='2x' className='text-[#1010118a]' icon={faArrowCircleRight}/></div>
        </Swiper>
        </>
    );
}

function CapacityBuildingPrograms(){

    const ourOfferings = 
[
    {
        img:"/img/programs/capacity_building_programs/img_1.JPG",
        img_text:"Accelerator Program",
        icon:"/img/programs/capacity_building_programs/icon_1.png",
        icon_head:"Funding up to $50K",
        icon_text:`Our primary goal is to identify and
nurture promising startups, providing
them with the necessary resources,
mentorship, and access to a robust
network of industry experts, investors,
and strategic partners. Through our
tailored acceleration program, we aim
to catalyze the growth of these startups,
helping them achieve product-market fit,
scale their operations, and secure
funding to fuel their expansion.`,
        bgColor:"bg-gray-300",
        textColor:"text-customColor-blue",
        linkColor:"bg-customColor-dark_yellow",
        revers:""

    },

    {
        img:"/img/programs/capacity_building_programs/img_2.JPG",
        img_text:"Investment Deployment Programs",
        icon:"/img/programs/capacity_building_programs/icon_2.png",
        icon_head:"Empowering the Ecosystem",
        icon_text: `We commit to empowering businesses
and communities by deploying capital
effectively, fostering innovation, and
ensuring sustainable development.
Through rigorous evaluation, adaptive
strategies, and stakeholder collaboration,
we aim to achieve exceptional financial
returns while making a positive social
and environmental impact.`,
        bgColor:"bg-customColor-blue",
        textColor:"text-white",
        linkColor:"bg-customColor-dark_yellow",
        revers:"md:flex-row-reverse"

    },

    {
        img:"/img/programs/capacity_building_programs/img_3.JPG",
        img_text:"Corporate Innovation Programs",
        icon:"/img/programs/capacity_building_programs/icon_3.png",
        icon_head:"Foster Innovation",
        icon_text:`Our aim is to foster creativity, develop
new ideas, and drive the creation of
innovative products, services, or
processes. These programs aim to
maintain or enhance the company's
competitive edge in the market by
continuously evolving and adapting
to changes.`,
        bgColor:"bg-gray-200",
        textColor:"text-customColor-blue",
        linkColor:"bg-customColor-blue hover:border-customColor-blue hover:text-customColor-blue",
        revers:"",

    },

    {
        img:"/img/programs/capacity_building_programs/img_4.JPG",
        img_text:"Incubation Programs", 
        icon:"/img/programs/capacity_building_programs/icon_4.png",
        icon_head:`Empowering Entrepreneurs`,
        icon_text:`By providing comprehensive incubation
programs. We commit to offering strategic
mentorship, access to cutting-edge resources,
and a collaborative environment to transform
visionary ideas into thriving businesses.
By nurturing talent and driving sustainable
development, we aim to create a dynamic
entrepreneurial ecosystem that contributes
to economic prosperity and societal well-being.`,
        bgColor:"bg-customColor-blue",
        textColor:"text-white",
        linkColor:"bg-blue-950 hover:border-customColor-blue hover:text-customColor-blue",
        revers:"md:flex-row-reverse",

    },
    {
        img:"/img/programs/capacity_building_programs/img_5.JPG",
        img_text:"Investment Readiness Programs", 
        icon:"/img/programs/capacity_building_programs/icon_5.png",
        icon_head:`Strategic Guidance`,
        icon_text:`Our mission is to prepare businesses
for successful investments through
tailored readiness programs. We
provide strategic guidance, essential
resources, and expert mentorship to
ensure companies are equipped to
attract and secure funding. We aim
to empower businesses to achieve
sustainable growth and impactful
success.`,
        bgColor:"bg-gray-200",
        textColor:"text-customColor-blue",
        linkColor:"bg-blue-950 hover:border-customColor-blue hover:text-customColor-blue",
        revers:"",

    }
] 

    return(
        <>
            <div id="ourOfferings">
                    <p className="text-customColor-blue bg-gray-200 text-2xl md:text-4xl text-center font-extrabold p-12 wow animate__animated animate__slideInUp">Capacity Building Programs</p>
                    <div className="flex flex-col">
                        <div className="flex  md:flex-row flex-wrap">
                                {

                                    ourOfferings?.map((o)=>(
                                        <>
                                                      <div className={`flex flex-col md:flex-row ${o.revers}`}>
                                                <div className={`w-full md:w-2/5 ${o.bgColor} flex flex-col items-center p-14`}>
                                                    <div className="flex flex-col md:flex-row items-center animate-bounce">
                                                        <img src={`${o.icon}`} className="size-48 wow animate__animated animate__slideInUp animate-bounce"/>
                                                        <p className={`text-center md:text-start text-2xl md:text-3xl ${o.textColor} font-extrabold wow animate__animated animate__slideInUp`}>{o.icon_head}</p>
                                                    </div>
                                                    <p className={`text-base md:text-1xl text-center p-4 ${o.textColor} `}>
                                                        {o.icon_text}
                                                    </p>
                                                </div>
                                                <div className="w-full md:w-3/5">
                                                    <div className="-z-10 relative overflow-hidden wow animate__animated animate__slideInDown">
                                                        <img src={`${o.img}`} className="w-full object-fit zoom-in-out-box "/>
                                                        <div className="w-full h-full absolute top-0 bg-black opacity-75"></div>
                                                        <span className={`text-white text-center text-nowrap font-extrabold text-2xl md:text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${o.textColor}  `}>
                                                            {o.img_text}
                                                        </span>            
                                                    </div>
                                                </div> 
                                            </div>
                                        </>
                                    ))
                                }

                                       


                        </div>
                    </div>

            </div>
            
        </>
    );
}

function StepperResearchProducts(){

    const [radioButtons, setRadioButtons] = useState<HTMLInputElement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [services, setServices] = useState<Carousel[]>([]);
    const { getData } = useAxiosGetData();
    const radioRefs = useRef<(HTMLInputElement | null)[]>([]);
    const swiperRef = useRef<SwiperType | null>(null); // Ref to Swiper instance
    const [activeLeftButton , setActiveLeftButton] = useState(false);
  
    const fetchData = async () => {
      const res = await getData(`${ENDPOINT_CAROUSEL}/programs/progrmas_avilable_and_ongoing`, '');
      setServices(res);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
   
    useEffect(() => {
      // Update radioButtons whenever services change
      setRadioButtons(radioRefs.current.filter(ref => ref !== null) as HTMLInputElement[]);
    }, [services]);
  
  
  
  
    const handleSlideNext = () => {
      if (swiperRef.current) {
        swiperRef.current.slideNext(); // Go to next slide
      }
    };
  
    const handleSlidePrev = () => {
      if (swiperRef.current) {
        swiperRef.current.slidePrev(); // Go to previous slide
      }
    };
  
  
  
  
  
    const handelRadioClickLeft = useCallback(() => {
      if (radioButtons.length > 0) {
        handleSlideNext();
        radioButtons[currentIndex].checked = false;
        const newIndex = (currentIndex + 1) % radioButtons.length;
        setCurrentIndex(newIndex);
        radioButtons[newIndex].checked = true;
      }
    }, [currentIndex, radioButtons]);
  
    const handelRadioClickRight = useCallback(() => {
      if (radioButtons.length > 0) {
        handleSlidePrev();
        radioButtons[currentIndex].checked = false;
        const newIndex = (currentIndex - 1 + radioButtons.length) % radioButtons.length;
        setCurrentIndex(newIndex);
        radioButtons[newIndex].checked = true;
      }
    }, [currentIndex, radioButtons]);
  

    return(<>
           <div className='flex flex-col w-full relative  my-10 '>
              <p className="text-customColor-blue  text-2xl md:text-4xl text-center font-extrabold p-12 wow animate__animated animate__slideInUp">Research Products</p>
              <div className=' flex flex-col'>
        <Swiper
          className='w-full'
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
          }}
          slidesPerView={2}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}

        >
          {
            services.map((serv: Carousel, index: number) => (
              <SwiperSlide key={index} className=''>
                <div className='flex w-full border-b-2 border-customColor-blue items-center justify-center'>
                  <div key={index} className='w-1/2 flex flex-col justify-center items-center'>
                    <img className='size-52 mb-16' src={`${BACKEND_SERVER}/uploads/${serv.car_img}`} alt={serv.car_img} />
                    <input ref={(el) => (radioRefs.current[index] = el)} className='readioService absolute mt-64 size-9 ' name='server' type='radio' />
                  </div>
                </div>
                <div className='flex w-full mt-4 items-center justify-center'>
                  <div key={index} className='w-1/2 flex  flex-col items-center justify-center font-extrabold'>
                    <h1 className="text-customColor-blue text-2xl">{serv.car_title}</h1><br/>
                    <p className="font-normal ">
                        {serv?.car_content}
                    </p>
                    <div className="flex items-start w-full mt-10">
                        <a  href={serv?.car_link}>{serv?.car_link_text}</a>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className='flex items-end justify-between p-4'>
          <div>
          </div>
          <div className='space-x-3'>
            <button onClick={handelRadioClickRight}>
              <FontAwesomeIcon className='text-slate-100' size='2x' icon={faArrowCircleLeft} />
            </button>
            <button onClick={handelRadioClickLeft}>
              <FontAwesomeIcon className='text-slate-100' size='2x' icon={faArrowCircleRight} />
            </button>
          </div>
        </div>
      </div>
            </div>
    </>)
}

function OurAdvisoryClients(){
    const init:Carousel[] = []
      const [carousel,setCarousel] = useState(init);
      const {getData} = useAxiosGetData();
      useEffect(()=>{
          getData(`${ENDPOINT_CAROUSEL}/programs/programs_partners`,'').then((res:Carousel[])=>{
              setCarousel(res);
          });
      },[]);
      return(
          <>
              <div className='flex flex-col w-2/4 relative left-1/4 my-10'>
              <p className="text-customColor-blue  text-2xl md:text-4xl text-center font-extrabold p-12 wow animate__animated animate__slideInUp">Our Advisory Clients</p>

              </div>
              <Swiper
                modules={[Autoplay]}
                effect='coverflow'
                slidesPerView={8}
                loop={true}
                autoplay ={{
                  delay:1000,
                  disableOnInteraction: false,
  
                }}
              >
                     {
                        carousel?.map((car)=>(
                          <SwiperSlide>
                              <img className='size-52' src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                          </SwiperSlide>
                        ))
                      }
                     </Swiper>
          </>
      );
  }


function ValueAddedPartners(){
    const images = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <>
        <div id="Value_Added_Partners" className="wow animate__animated animate__slideInUp"  data-wow-delay="0.5s" data-wow-duration="2s">
        <p className="text-center bg-blue-950 text-white font-extrabold text-2xl md:text-3xl p-10">Value Added <span className="text-green-300">Partners</span><br/>Over EGP <span className="text-amber-200">1,000,000</span> in Perks</p>
        <div className="flex flex-row flex-wrap items-center justify-center wow animate__animated animate__slideInUp"  data-wow-delay="0.5s" data-wow-duration="2s">
               {images.map(i => (
              <div key={i} className="w-1/5">
                <img
                  src={`/img/programs/partners/Value_added_partners-0${i}.png`}
                  className="w-60"
                  alt={`Partner ${i}`}
                />
              </div>
            ))}
        </div>
    </div>
    </>
    );
}
   
 

export default function Programs(){
    return(
        <>
             {/* Header */}
             <section className='flex h-[88vh]'>
                <div className='w-1/3 h-full bg-customColor-blue flex items-center justify-center'>
                    <h1 className='text-white font-extrabold  text-3xl lg:text-4xl  text-center'>“Pushing the boundries<br/>of Egypt’s <span className="text-customColor-green">innovation</span>”</h1>
                </div>
                <div className='w-2/3'>
                     <CarouselHeader />
                </div>
            </section>
            <CapacityBuildingPrograms/>
            <StepperResearchProducts/>
            <OurAdvisoryClients/>
            <ValueAddedPartners/>
        </>
    );
}
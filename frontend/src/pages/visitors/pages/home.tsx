import 'swiper/css';
import 'swiper/css/autoplay'
import 'swiper/css/pagination';
import { Autoplay,Navigation,Pagination ,EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import map from '../../../assets/img/home/map.png';
import icon_0 from '../../../assets/img/home/icon_0.png';
import icon_1 from '../../../assets/img/home/icon_1.png';
import icon_2 from '../../../assets/img/home/icon_2.png'; 

import 'swiper/css/effect-coverflow';


import { Swiper as SwiperType } from 'swiper'; // Import Swiper type for TypeScript



import { useCallback, useEffect, useRef, useState } from 'react';
import { useAxiosGetData } from '../../../hooks/useFetch';
import { Carousel } from '../../../types';
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import 'animate.css/animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';





function CarouselHeader(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/home/header`,'').then((res:Carousel[])=>{
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
                                    <img className={`z-0 absolute object-cover w-full h-[100%]`} src={`${BACKEND_SERVER}/uploads/${c?.car_img}`}/>
                                    <div className={`h-full bg-custom-black relative`}></div>
                                    <p className="px-40 md:px-60 w-full absolute bottom-32 text-2xl md:text-2xl text-center text-white  font-bold md:font-extrabold">{<div dangerouslySetInnerHTML={{__html:c?.car_title}}>{}</div>}</p>
                                    <a className="absolute bottom-4 left-[35%] md:left-[41%] py-4  px-16 z-10 bg-customColor-blue rounded-full w-fit text-lg  car_link font-bold text-white  hover:border-2 hover:border-customColor-blue hover:bg-transparent transform transition-transform duration-200 ease-in-out hover:-translate-y-0.5  hover:cursor-pointer" href={`${c?.car_link}`}>learn more</a>
                                </SwiperSlide>

                    )
                    )
                }
                <div className="swiper-pagination" style={{right:'3%'}}></div>
                <div className="swiper-button-next absolute bottom-28 right-16 z-10"><FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleLeft}/></div>
                <div className="swiper-button-prev absolute bottom-28 right-3 z-10"> <FontAwesomeIcon size='2x' className='text-customColor-button' icon={faChevronCircleRight}/></div>
        </Swiper>
        </>
    );
}


function AboutUs(){
  const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/home/about_us`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
    },[]);
      const justGetOne = carousel[0];
    return(
        <>
            <div className='flex flex-col w-full px-20 md:w-2/4 relative md:left-1/4 my-10'>
                    <h2 data-aos="fade-up" data-aos-duration="1000" className='text-start text-xl'><FontAwesomeIcon className='text-customColor-green' icon={faAngleDoubleRight}/>About Us</h2><br/>
                    <h3 data-aos="fade-up" data-aos-duration="1000" className='text-start text-2xl font-extrabold'>{ <div dangerouslySetInnerHTML={{ __html: justGetOne?.car_title }} /> }</h3><br/>
                    <p data-aos="fade-up" data-aos-duration="1000" className='text-start text-2xl'>
                      {<div dangerouslySetInnerHTML={{ __html: justGetOne?.car_content }} />}
                    </p>
                    <br/>
                    <br/>
                    

                    <a data-aos="fade-up" data-aos-duration="1000" className='text-xl font-light animate-bounce' href={justGetOne?.car_link}>learn more <FontAwesomeIcon className='text-slate-300' size='1x' icon={faChevronCircleRight}/></a>
            </div>
        </>
    );
}


function Numbers(){
    return(
        <>
            <div data-aos="fade-up" data-aos-duration="3000" data-aos-delay="5000" className='w-full px-20 md:w-2/3 relative md:left-1/4'>
                <h2 className='text-start text-xl'><FontAwesomeIcon className='text-customColor-green' icon={faAngleDoubleRight}/>Entlaq in Numbers</h2><br/>
                <img  src={map} className='animate-bounce'/>
                <div className='flex mt-3'>
                    <div className='border-r-2 border-t-2 p-6'>
                        <h4 className='text-2xl md:text-4xl text-customColor-blue font-extrabold'><CountUp start={0} end={800} duration={3} delay={3} ></CountUp></h4>
                        <p className='ml-6  textlg md:text-2xl'>Network of<br/>startups</p>
                    </div>
                    <div className='border-r-2 border-t-2  p-6'>
                        <h4 className='text-2xl md:text-4xl text-customColor-blue font-extrabold'><CountUp start={0} end={7} duration={3} delay={3} ></CountUp>+</h4>
                        <p className='ml-6 text-lg md:text-2xl'>Global<br/>Partnerships</p>
                    </div>
                    <div className=' border-t-2  p-6'>
                        <h4 className='text-2xl md:text-4xl text-customColor-blue font-extrabold'><CountUp start={0} end={22} duration={3} delay={3} ></CountUp>+</h4>
                        <p className='ml-6 text-lg md:text-2xl'>Government<br/>Partnerships</p>
                    </div>
                </div>
            </div> 
        </>
    );
}

function Services(){
    return(
        <>
        <div  className='flex flex-col bg-customColor-blue p-4' >
            <h1 data-aos="fade-left" data-aos-duration="2000" className='text-white text-3xl md:text-4xl font-extrabold mb-5'>Our Services</h1>
            <span data-aos="fade-left" data-aos-duration="2000" data-aos-delay="2000" className='text-customColor-yellow text-2xl md:text-3xl font-extrabold border-b-8 border-customColor-yellow rounded-md w-fit pb-3'>Entlaq Advisory</span>
            <h2 data-aos="fade-left" data-aos-duration="2000" data-aos-delay="3000" className='text-white text-3xl md:text-4xl font-extrabold my-10'>Data-driven<br/> Decision Making</h2>
        </div>
        </>
    );
}

function StepperServices() {
  const [radioButtons, setRadioButtons] = useState<HTMLInputElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [services, setServices] = useState<Carousel[]>([]);
  const { getData } = useAxiosGetData();
  const radioRefs = useRef<(HTMLInputElement | null)[]>([]);
  const swiperRef = useRef<SwiperType | null>(null); // Ref to Swiper instance
  const [ourServicesLink,setOurServiceLink] = useState<Carousel[]>([]);
  const fetchData = async () => {
    const res = await getData(`${ENDPOINT_CAROUSEL}/home/our_services`, '');
    setServices(res);
  };

  const fetchLink = async () => {
    const res = await getData(`${ENDPOINT_CAROUSEL}/home/our_services_link`, '');
    setOurServiceLink(res);
    console.warn(res)
  };

  useEffect(() => {
    fetchData();
    fetchLink();
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

  return (
    <>
      <div className='bg-customColor-blue flex flex-col'>
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
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            // when window width is >= 640px (phone)
            500: {
              slidesPerView: 2,
            },
            // when window width is >= 768px (tablet)
            768: {
              slidesPerView: 4,
            },
          }}

        >
          {
            services.map((serv: Carousel, index: number) => (
              <SwiperSlide key={index} className=''>
                <div className='flex w-full border-b-2 border-white items-center justify-center'>
                  <div key={index} className='w-1/4 flex flex-col justify-center items-center'>
                    <img className='size-42 mb-8' src={`${BACKEND_SERVER}/uploads/${serv.car_img}`} alt={serv.car_img} />
                    <input ref={(el) => (radioRefs.current[index] = el)} className='readioService absolute mt-32 size-7  md:mt-32 md:size-6' name='server' type='radio' />
                  </div>
                </div>
                <div className='flex w-full mt-4 items-center justify-center'>
                  <div key={index} className='w-1/3 flex items-center justify-center text-center text-white font-extrabold'>
                    {serv.car_title}
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className='flex items-end justify-between p-4'>
          <div>
            <a className='text-slate-100 text-xl animate-bounce' href={ourServicesLink[0]?.car_link}> Learn More <FontAwesomeIcon className='text-customColor-button' icon={faChevronCircleRight} /></a>
          </div>
          <div className='space-x-3'>
            <button onClick={handelRadioClickRight}>
              <FontAwesomeIcon className='text-customColor-button' size='2x' icon={faChevronCircleLeft} />
            </button>
            <button onClick={handelRadioClickLeft}>
              <FontAwesomeIcon className='text-customColor-button' size='2x' icon={faChevronCircleRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function OurServices(){
  const [partners, setPartners] = useState<Carousel[]>([]);
  const [ourServiceLink, setOurServiceLink] = useState<Carousel[]>([]);

  const { getData } = useAxiosGetData();
  const fetchData = async () => {
    const res = await getData(`${ENDPOINT_CAROUSEL}/home/programs_partners`, '');
    setPartners(res);
  };
  const fetchLink = async () => {
    const res = await getData(`${ENDPOINT_CAROUSEL}/home/our_services_link_2`, '');
    setOurServiceLink(res);
    console.warn(res)
  };

  useEffect(() => {
    fetchData();
    fetchLink();
  }, []);
  const our_services = [
    {
      icon:icon_0,
      title:'Accelerator & Investment \n Promotion'
    },
    {
      icon:icon_1,
      title:'Corportate Innovation \nPrograms'
    },
    {
      icon:icon_2,
      title:'Incubation & Investment \nReadiness Programs'
    },
  ]

  return(
    <>
      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000" className='flex flex-col bg-slate-100 p-4'>
            <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="2000" className='text-customColor-blue text-4xl font-extrabold mb-5'>Our Services</h1>
            <span  data-aos="fade-up" data-aos-duration="1000" data-aos-delay="3000" className='text-customColor-yellow text-3xl font-extrabold border-b-8 border-customColor-yellow rounded-md w-fit pb-3'>Entlaq Programs</span>
            <div  data-aos="fade-up" data-aos-duration="1000" data-aos-delay="4000" className='flex flex-col md:flex-row w-full'>

                  <div className='w-full md:w-1/2 md:border-r-2'>
                          <h1 className='text-customColor-blue text-3xl md:text-4xl font-extrabold mt-7'>Upskilling &<br/>Investment Promotion</h1>
                          <div className='flex flex-col items-start'>
                              {
                                our_services.map((s)=>{
                                  return(
                                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="2000" className='flex items-center justify-center my-5'>
                                          <img className='size-44' src={s.icon} alt={s.icon} />
                                          <p className='ml-4 text-customColor-blue text-xl font-extrabold'>
                                              {s.title.split('\n').map((line, index) => (
                                                <React.Fragment key={index}>
                                                  {line}
                                                  <br />
                                                </React.Fragment>
                                              ))}
                                            </p>                                    
                                      </div>
                                  )
                                })
                              }
            <a className='text-customColor-blue text-xl animate-bounce' href={ourServiceLink[0]?.car_link}> Learn More <FontAwesomeIcon className='text-slate-400' icon={faChevronCircleRight} /></a>
            </div>
                  </div>
                  <div className='w-full md:w-1/2 '>
                          <h1 className='ml-28 text-start text-customColor-blue text-3xl md:text-4xl font-extrabold mt-20 md:mt-7'>Entlaq<br/>Programs’ Partners</h1>

                          <Swiper
                          autoplay={{delay: 2000,disableOnInteraction: false, }}
                          modules={[Autoplay, Navigation, Pagination]}
                           navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                          }}
                          >
                                {
                                  partners.map((p)=>(
                                    <SwiperSlide key={p?.id}>
                                      <img  src={`${BACKEND_SERVER}/uploads/${p.car_img}`}/>
                                    </SwiperSlide>
                                  ))
                                }
                                 <div className="swiper-button-next absolute bottom-28 right-16 z-10"><FontAwesomeIcon size='2x' className='text-slate-400' icon={faChevronCircleLeft}/></div>
                                <div className="swiper-button-prev absolute bottom-28 right-3 z-10"> <FontAwesomeIcon size='2x' className='text-slate-400' icon={faChevronCircleRight}/></div>
                          </Swiper>

                  </div>
            </div>
      </div>
    </>
  );
}


function News(){
  const [news, setNews] = useState<Carousel[]>([]);
  const { getData } = useAxiosGetData();
  const fetchData = async () => {
    const res = await getData(`${ENDPOINT_CAROUSEL}/home/projects_and_news`, '');
    setNews(res);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return(
    <>
      <Swiper
        className='my-16 h-[75vh]'
        modules={[EffectCoverflow,Navigation, Pagination,Autoplay]}  
        spaceBetween={10}
        effect='coverflow'
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          reverseDirection:true
        }}
        centeredSlides={true}

        slidesPerView={4}
        coverflowEffect={
                {
                    rotate: 4,
                    stretch: -10,
                    depth: 350,
                    modifier: 1,
                    slideShadows: false,
                }
              }
              initialSlide={2}
              breakpoints={{
                500: {
                  slidesPerView: 2,
                  
                },
                // when window width is >= 768px (tablet)
                768: {
                  slidesPerView: 4,
                },
              }}
              pagination={{
                el:".swiper-pagination",
                
            }} 
            navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        
 
      >
              {
                                  news.map((p)=>(
                                    <SwiperSlide key={p?.id} className=''>
                                      <img className='size-96 shadow-lg' src={`${BACKEND_SERVER}/uploads/${p.car_img}`}/>
                                      <h1 className='text-center mt-6'>{p.car_title}</h1>
                                    </SwiperSlide>
                                  ))
                }
                 <div className="swiper-pagination" style={{bottom:'10%'}}></div>
                <div className="swiper-button-prev absolute bottom-6 left-1/2 z-10"> <FontAwesomeIcon size='2x' className='text-slate-400' icon={faChevronCircleRight}/></div>
                <div className="swiper-button-next absolute bottom-6 left-[45%] md:left-[47%] z-10"><FontAwesomeIcon size='2x' className='text-slate-400' icon={faChevronCircleLeft}/></div>
        
       </Swiper>
    </>
  );
}

function Testimonials(){
  const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const {getData} = useAxiosGetData();
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/home/testimonials`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
    },[]);
    return(
        <>
          <h2 className='text-start text-xl relative left-[10%] md:left-[20%]'><FontAwesomeIcon className='text-customColor-green' icon={faAngleDoubleRight}/>Testimonials</h2><br/>
          <h3 className='text-start text-2xl relative left-[10%] md:left-[20%] font-extrabold'>Notes about <br/> Entlaq</h3><br/>

          <Swiper
                className='w-full  md:w-[60%]'
                 autoplay={{delay: 2000,disableOnInteraction: false, }}
                 modules={[Autoplay, Navigation, Pagination]}  
                 pagination={{
                     el:".swiper-pagination",
                     
                 }} 
                 navigation={{
                 nextEl: '.swiper-button-next',
                 prevEl: '.swiper-button-prev',
               }}
               
               >
              
                  {
                    carousel?.map((car:Carousel)=>(
                      <SwiperSlide key={car?.id}>
                                <div className='flex flex-col md:flex-row-reverse'>
                                    <div className="mx-5">
                                        <i className="fa-solid fa-quote-left text-1xl lg:text-3xl text-blue-700  animate-bounce" style={{textShadow:'10px -10px 2px rgba(0, 0, 255, 0.2);'}}></i><br/>
                                        <p  className='inline  text-base lg:text-1xl px-2' style={{lineHeight:'0.9cm'}}> {car?.car_content}</p>
                                        <i className="fa-solid fa-quote-right text-1xl lg:text-3xl  text-blue-700 animate-bounce" style={{textShadow:'10px 10px 2px rgba(0, 0, 255, 0.2);'}}></i>
                                    </div>                              
                                    <div className='flex items-end justify-end'>
                                        <div>
                                                <div className='w-40 h-48 flex items-center justify-center  relative mb-9'>
                                                    <div className='size-8 bg-blue-950 absolute -bottom-8 -left-2 hidden lg:flex animate-bounce'></div>
                                                    <div className='size-8 bg-blue-500 absolute -bottom-10 -left-4 z-0 hidden lg:flex animate-bounce'></div>
                                                    <img className='rounded-full md:rounded-sm w-36 h-36  md:w-full md:h-full z-10 shadow-[4px_4px_5px_1px_rgba(0,0,0,0.3)]' src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                                                </div>
                                          <h1 className='text-base md:text-lg text-customColor-green font-extrabold'>{car?.car_name}</h1>
                                          <h1 className='text-sm md:text-base w-52'>{<div dangerouslySetInnerHTML={{__html:car?.car_job}}/>}</h1>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                    ))
                  }
                     <div className="swiper-pagination" style={{bottom:'10%'}}></div>
                    <div className="swiper-button-prev absolute bottom-1 left-1/2 z-10"> <FontAwesomeIcon size='2x' className='text-slate-400' icon={faChevronCircleRight}/></div>
                    <div className="swiper-button-next absolute bottom-1 left-[43%] md:left-[47%] z-10"><FontAwesomeIcon size='2x' className='text-slate-400' icon={faChevronCircleLeft}/></div>
        
              </Swiper>

        </>
    );
}
function EntlaqPartners(){
  const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const [pertnersText,setPartnersText] = useState<Carousel[]>([]);
    const {getData} = useAxiosGetData();

    const fetchText = async () => {
      const res = await getData(`${ENDPOINT_CAROUSEL}/home/partner_text`, '');
      setPartnersText(res);
      console.warn(res)
    };
    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/home/partners`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
        fetchText();
    },[]);
    return(
                // w-full px-20 md:w-2/4 relative md:left-1/4 my-10

        <>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000" className='flex flex-col w-full px-20 md:w-2/4 relative md:left-1/4 my-10'>
                    <h2 className='text-start text-xl'><FontAwesomeIcon className='text-customColor-green' icon={faAngleDoubleRight}/>Entlaq Partners</h2><br/>
                    <h3 className='text-start text-2xl font-extrabold'>{ <div dangerouslySetInnerHTML={{ __html: pertnersText[0]?.car_title }} /> }</h3><br/>
                    <p className='text-start text-lg md:text-2xl'>
                      {<div dangerouslySetInnerHTML={{ __html: pertnersText[0]?.car_content }} />}
                    </p> 
            </div>
            <Swiper
            data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000"

              modules={[Autoplay]}
              effect='coverflow'
              slidesPerView={9}
              loop={true}
              autoplay ={{
                delay:1000,
                disableOnInteraction: false,

              }}
            >
                   {
                      carousel?.map((car)=>(
                        <SwiperSlide>
                            <img  className='size-40 md:size-52' src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                        </SwiperSlide>
                      ))
                    }
                   </Swiper>
        </>
    );
}

export default function Home(){
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      once: true,     // Whether animation should happen only once while scrolling down
    });
  }, []);
 

    return(
        <>
        {/* Header */}
            <section className='flex h-[88vh]'>
                <div className='hidden md:flex w-1/3 h-full bg-customColor-blue flex items-center justify-center '>
                    <h1 data-aos="fade-up" data-aos-duration="2000" className='text-white font-extrabold  text-3xl lg:text-4xl  text-center'>“Pushing the boundries<br/>of Egypt’s <span className="text-customColor-green">innovation</span>”</h1>
                </div>
                <div data-aos="fade-left" data-aos-duration="1000" className='w-full md:w-2/3'>
                     <CarouselHeader />
                </div>
            </section>
            {/* About us */}
            <AboutUs />
            <Numbers />
            <Services />
            <StepperServices/>
            <OurServices/>
            <News />
            <Testimonials/>
            <EntlaqPartners/>
        </>
    );
}

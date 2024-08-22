import { faChevronCircleLeft, faChevronCircleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { ENDPOINT_CAROUSEL, BACKEND_SERVER } from "../../../../../config";
import { useAxiosGetData } from "../../../../../hooks/useFetch";
import { Carousel } from "../../../../../types";


export function Videos(){
    const init:Carousel[] = []
    const [carousel,setCarousel] = useState(init);
    const [totalPage,setTotalPage] = useState(0);
    const {getData} = useAxiosGetData();
    const [page,setPage] = useState(0);
    const refPage = useRef([]);
    const [light,setLight] = useState(page/6);
    const [showPopup, setShowPopup] = useState(false);
    const [joker,setJoker] = useState<string>('')
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
    const Popup = ({img})=>{
        const url = img?.split("?v=")[1]
     
        return(
            <div className="fixed top-0 h-screen w-screen bg-custom-black" style={{zIndex:'50'}}>
                <div className="h-[70vh] w-[70%] left-[15%] flex flex-col items-center justify-center relative top-36 rounded-lg">
                    <FontAwesomeIcon onClick={()=>{setShowPopup(!showPopup)}} className="bg-red-800 text-white p-5 absolute top-[4%] right-[0]" icon={faClose}/>
                    <iframe src={`https://www.youtube.com/embed/${url}`} className='h-full w-full relative top-20' />

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
        getData(`${ENDPOINT_CAROUSEL}/media_center/videos/6/0`,'').then((res:Carousel[])=>{
            setCarousel(res);
        });
        getData(`${BACKEND_SERVER}/api/count/media_center/videos`,'').then((res)=>{
            setTotalPage(Math.ceil((+res?.total/6)));
        });
    },[]);

    useEffect(()=>{
        console.log(page);
        getData(`${ENDPOINT_CAROUSEL}/media_center/videos/6/${page}`,'').then((res:Carousel[])=>{
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
    return(
        <>
                            {showPopup?<Popup img={joker} />:null}

            <div id="videos" className="">
                <h1 className="text-center text-customColor-blue text-4xl font-extrabold mt-20">Videos</h1>
                    <div className="flex flex-col md:flex-row flex-wrap p-10">
                            {
                                carousel?.map((car)=>(
                                    <div key={car.id} className="w-full md:w-[30%]  bg-customColor-blue mt-6 md:m-6 shadow-2xl rounded-2xl">
                                            <img data-info={car?.car_link} onClick={handelPopup} className="w-full h-96 object-cover rounded-t-2xl" src={`${BACKEND_SERVER}/uploads/${car?.car_img}`}/>
                                            <h2 className="p-6 text-center text-white text-xl font-bold mt-2">{<div dangerouslySetInnerHTML={{__html:car?.car_title}}></div>}</h2>    
                                    </div>
                                ))
                            }
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
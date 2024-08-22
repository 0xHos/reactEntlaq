import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useEffect, useState } from "react";
import useAxiosSendData, { useAxiosGetData } from "../../../hooks/useFetch";
import {Carousel, RportOrGallery} from '../../../types/index'
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";



const Report = ()=>{
    const {getData} = useAxiosGetData();
    const {sendData} = useAxiosSendData();
    const [carousels,setCarousels] = useState<Carousel[]>([]);
    const [reportId,setReportId] = useState('');
    const [section,setSection] = useState('');
    const [videoUrl,setVideoUrl] = useState('');
    const [file, setFile] = useState(null);
    const endpoint_gallery = `${BACKEND_SERVER}/api/gallery/`; 


    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/report`,sessionStorage.getItem("token")||"").then((res)=>setCarousels(res?.carousels));
    },[]);

    const handelChangeReport = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setReportId(event.currentTarget.value);

    }
    const handelSection = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setSection(event.currentTarget.value);

    }

    const handleInputVideoUrl = (event)=>{
        setVideoUrl(event.currentTarget.value);

    }
    const handelFile = (event)=>{
        setFile(event.target.files[0])
       };

       const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id_car',reportId);            
        formData.append('section',section); 
        formData.append('car_name',videoUrl);            
        formData.append('car_img',file)
        try{
            const res = await sendData(endpoint_gallery,formData,sessionStorage.getItem("token")||"")
            console.log(endpoint_gallery);
            console.log(res);

            alert(res.msg);
            location.reload();
        }catch(err){
          console.log(err);
        }
      };
    return(
        <>
             <div className="w-full">
                   <form onSubmit={handleSubmit}>
                            <label htmlFor="report" className="block mb-2 text-sm font-medium text-gray-900">Report</label>
                            <select name="report" className="w-full p-5" onChange={handelChangeReport}>
                                <option>-</option>
                                {
                                    
                                    carousels?.map((car:Carousel)=>(<option className="w-full"  key={car.id} value={car?.id}>{car?.car_title.replace(/<[^>]*>/g, '')}</option>))
                                }
                            </select>
                            <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900">section</label>
                            <select name="section" className="w-full p-5" onChange={handelSection}>
                                <option>-</option>
                                <option value='header'>Header</option>
                                <option value='videos'>Videos</option>
                                <option value='insights'>Insights</option>
                                <option value='news'>News</option>
                                <option value='partners'>Partners</option>

                            </select>
                            {
                                section == "header"?
                                    <>
                                       <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                                       <select name="car_name" className=" block mb-2 text-sm font-medium text-gray-900" onChange={handelSection}>
                                            <option value='image_report_header'>Image</option>
                                            <option value='video_report_header'>Video</option>
                                            <option value='report_report_header'>Report</option> 
                                       </select>
                                    </>

                                :null
                            }

                            {/* {section == 'videos'?<input type="text" onBlur={handleInputVideoUrl} placeholder="video url" className="m-1  border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"/>:null} */}
                            <input type="file" onChange={handelFile} name="car_img"/>
                            <button type="submit"  className="w-full text-white bg-blue-800 p-5 mt-5 rounded-lg">
                               Add <FontAwesomeIcon icon={faAdd}/>
                            </button>
                   </form>

            </div>
        </>
    );
}

const Gallery = ()=>{
    const {getData} = useAxiosGetData();
    const {sendData} = useAxiosSendData();
    const [carousels,setCarousels] = useState<Carousel[]>([]);
    const [galleryId,setGalleryId] = useState('');
    const [file, setFile] = useState(null);
    const endpoint_gallery = `${BACKEND_SERVER}/api/gallery/`;

    const handelChangeGallery = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setGalleryId(event.currentTarget.value);
        console.log(galleryId);

    }

    useEffect(()=>{
        getData(`${ENDPOINT_CAROUSEL}/media_center/gallery`,sessionStorage.getItem("token")||"").then((res)=>setCarousels(res));
    },[]);

    const handelFile = (event)=>{
        setFile(event.target.files[0])
       };

       const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id_car',galleryId);                    
        formData.append('car_img',file)
        try{
            const res = await sendData(endpoint_gallery,formData,sessionStorage.getItem("token")||"")
            console.log(endpoint_gallery);
            console.log(res);

            alert(res.msg);
            location.reload();
        }catch(err){
          console.log(err);
        }
      };
      console.log(carousels)
    return(
        <>
             <div className="w-full">
                    <form  onSubmit={handleSubmit}>
                            <label htmlFor="gallery" className="block mb-2 text-sm font-medium text-gray-900">Gallery</label>
                            <select name="gallery" className="w-full p-5" onChange={handelChangeGallery}>
                            <option>-</option>
                                        {
                                            
                                            carousels?.map((car:Carousel)=>(<option className="w-full"  key={car.id} value={car?.id}>{<div dangerouslySetInnerHTML={{__html:car.car_title}}></div>}</option>))
                                        }
                            </select>
                            <input type="file" onChange={handelFile} name="car_img"/>
                                    <button type="submit"  className="w-full text-white bg-blue-800 p-5 mt-5 rounded-lg">
                                    Add <FontAwesomeIcon icon={faAdd}/>
                                    </button>
                    </form>
            </div>
        </>
    );
}


export default function AddGallery(){
    const [reportOrPage ,setReoportOrPage ] = useState('');


    const handelChangeGR = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setReoportOrPage(event.currentTarget.value);
    }




    return (
        <>
             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                       <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"></a>
                       <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-lg dark:border-gray-700">
                           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                           <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                               Add In Gallery Or Report
                           </h1>
                               <div className="w-full">
                                    <label htmlFor="page" className="block mb-2 text-sm font-medium text-gray-900">
                                        Gallery or Report
                                    </label>
                                    <select name="g_o_r" className="w-full p-5" onChange={handelChangeGR}>
                                            <option value="-">-</option>
                                            <option value="gallery">Gallery</option>
                                            <option value="report">Report</option>
                                    </select>
                               </div>
                              
                                {
                                    reportOrPage =='gallery'?<Gallery/>:
                                    reportOrPage =='report'?<Report/>:null
                                }
                            


                           </div>
                       </div>
                       </div>
       </>
      );
}


import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useRef, useState } from "react";
import { ENDPOINT_CAROUSEL } from "../../../config";
import useAxiosSendData from "../../../hooks/useFetch";
import { Carousel } from "../../../types";
import JoditEditor from 'jodit-react';


export default function AddReport(){
    const [carousel, setCarousel] = useState<Carousel>({});
    const {sendData} = useAxiosSendData();
    const [file, setFile] = useState(null);






    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        setCarousel((prev: Carousel) =>  ({...prev, [event.target.name]: event.target.value}));
    };
    
     const handelFile = (event)=>{
      setFile(event.target.files[0])
     };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        for (let [key, value] of Object.entries(carousel)) {
          formData.append(key,value);
            
        }
        formData.append('car_img',file)
        formData.append('page',"report")
        formData.append('section',"header")
        
        try{
            const res = await sendData(ENDPOINT_CAROUSEL,formData,sessionStorage.getItem("token")||"")
            alert(res?.msg);
            location.reload();
        }catch(err){
          console.log(err);
        }
      };


    return (
        <>
            <div className="w-full bg-white p-5 rounded-lg border-2">
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                                   <div className="w-full">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                        {/* <input onBlur={handleInput} type="text" name="car_title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Title" required></input> */}
                                        <JoditEditor  onChange={(c) => { setCarousel((prev: Carousel) => ({ ...prev, car_title: c }));
                                } } value={""}/>
                                   </div>
                                   <div className="w-full">
                                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 ">Content</label>
                                        <JoditEditor  onChange={(c) => { setCarousel((prev: Carousel) => ({ ...prev, car_content: c }));
                                } } value={""}/>
                                        {/* <input onBlur={handleInput} type="text" name="car_content" id="content" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Content" required></input> */}
                                   </div>
                                   {/* <div className="w-full">
                                        <label htmlFor="report" className="block mb-2 text-sm font-medium text-gray-900 ">URL Report</label>
                                        <input onBlur={handleInput} type="text" name="car_link_text" id="report" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="URL Report" required></input>
                                   </div> */}
                                   <input type="file" onChange={handelFile} name="car_img"/>
                                   <button type="submit" className="w-full text-white bg-blue-800 p-5 mt-5 rounded-lg">Add <FontAwesomeIcon icon={faAdd}/></button>
                               </form>
                              
            </div>
       </>
      );
}



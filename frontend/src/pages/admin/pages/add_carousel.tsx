import React, { FormEvent, useState } from "react";
import { ENDPOINT_CAROUSEL } from "../../../config";
import { Carousel } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { PageOptionDropdown, SectionOptionDropdown } from "../data";
import useAxiosSendData from "../../../hooks/useFetch";


export default function AddCarousel() {

  const [carousel, setCarousel] = useState<Carousel>({});
  const {sendData} = useAxiosSendData();
  const [pageChoosed, setPageChoosed] = useState("");
  const [sectionChoosed, setSectionChoosed] = useState("");
  const [file, setFile] = useState(null);


  const handelChangePage = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    setPageChoosed(event.target.value);
    setCarousel((prev: Carousel) =>  ({...prev, [event.target.name]: event.target.value}));

  }

  const handelChangeSection = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    setSectionChoosed(event.target.value);
    setCarousel((prev: Carousel) =>  ({...prev, [event.target.name]: event.target.value}));

  }

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
    try{
        const res = await sendData(ENDPOINT_CAROUSEL,formData,sessionStorage.getItem("token")||"")
        alert(res.msg);
        location.reload();
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                       <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"></a>
                       <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-lg dark:border-gray-700">
                           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                           <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                               Add In Section
                           </h1>
                           <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                               <div className="w-full">
                               <label htmlFor="page" className="block mb-2 text-sm font-medium text-gray-900">
                                   Page
                               </label>
                               <select name="page" className="w-full p-5" onChange={handelChangePage}>
                                   {PageOptionDropdown.map((e)=>(<option key={e.show_name+e.value} value={e.value}>{e.show_name}</option>))}
                               </select>
                               </div>
                               <div className="w-full">
                               <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900">
                                   Section
                               </label>
                               <select name="section" className="w-full p-5" onChange={handelChangeSection}>
                                   {SectionOptionDropdown[pageChoosed]?.map((e)=><option key={e.show_name+e.value} value={e.value}>{e.show_name}</option>)}
                               </select>
                               </div>
                                   {SectionOptionDropdown[pageChoosed]?.filter((e)=>e.value == sectionChoosed)[0]?.input?.map((e)=>
                                       <input onBlur={handleInput}  type={e.type} name={e.name} placeholder={e.show_name} key={e.show_name+e.value} className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                                   ) || null}
                               <input type="file" onChange={handelFile} name="car_img"/>

                               <button type="submit" className="w-full text-white bg-blue-800 p-5 mt-5 rounded-lg">
                               Add <FontAwesomeIcon icon={faAdd}/>
                               </button>
                           </form>
                           </div>
                       </div>
                       </div>
   </>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosGetData, useAxiosUpdateData } from "../../../hooks/useFetch";
import { Carousel } from "../../../types";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { SectionOptionDropdown } from "../data";
import MyDropzone from "../components/dropzone";

export default function Update(){
    const {page,section,id} = useParams();
    const {getData} = useAxiosGetData();
    const {updatedData} = useAxiosUpdateData();
    const [file, setFile] = useState(null);
    const [carousel,setCarousel] = useState<Carousel>({});
    const [inputX,setInputX] = useState();


    const endpointCarousel = `${ENDPOINT_CAROUSEL}/${page}/${section}/${id}`
    const getCarouselData = async()=>{

            const res =  await  getData(endpointCarousel,"");
            setCarousel(res?.carousels);
    }
    useEffect(()=>{
        getCarouselData();
        SectionOptionDropdown[page]?.map((sec)=>{
            if(sec.value === section){
                setInputX(sec.input);
            }
        })
    }   ,[] );


    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setCarousel((prev:Carousel)=>({...prev,[event.target.name]:event.target.value}));
      };
    
    const handleFileChange = (files) => {
        setCarousel((prevData) => ({...prevData,car_img:files[0]}));
        console.log(carousel);
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        for (let [key, value] of Object.entries(carousel)) {
                formData.append(key,value);
        }
        

        try {
            const res = await updatedData(ENDPOINT_CAROUSEL, formData, sessionStorage.getItem("token") || "");
            alert(res.msg);
            location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    
    return(
        <>
            {

                <form onSubmit={handleSubmit} className="p-10">
                     {
                        inputX?.map((inx,index)=>{
                            return(
                                <div className="w-full   rounded-lg" key={index*4}>
                                    <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">{inx?.show_name}</label>
                                    {carousel[`${inx?.name}`] != null ?<textarea onChange={handleInputChange} name={`${inx?.name}`} value={carousel[`${inx?.name}`]} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />:null}
                                </div>
                            );
                        })
                    }
                    {
                         page == 'home' && section == 'about_us'?
                        <> 
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Title</label> 
                                <textarea name={`car_title`} value={carousel?.car_title} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            </div>
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Content</label> 
                                <textarea name={`car_content`} value={carousel?.car_content} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            </div>
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Link</label> 
                                <textarea name={`car_link`} value={carousel?.car_link} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            </div>
                        </>
                        :null
                     }


                    {
                         page == 'home' && section == 'partner_text'?
                        <> 
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Title</label> 
                                <textarea name={`car_title`} value={carousel?.car_title} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            </div>
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Content</label> 
                                <textarea name={`car_content`} value={carousel?.car_content} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            </div>
                        </>
                        :null
                     }

                    {
                         page == 'home' && section == 'our_services_link_2'?
                        <> 
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Link</label> 
                                <textarea name={`car_link`} value={carousel?.car_link} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            </div>
                        </>
                        :null
                     }

                    {
                         page == 'home' && section == 'our_services_link'?
                        <> 
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Link</label> 
                                <textarea name={`car_link`} value={carousel?.car_link} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            </div>
                        </>
                        :null
                     }

                    {carousel?.car_img != null ?<MyDropzone onFileChange={handleFileChange} initialImage={`${BACKEND_SERVER}/uploads/${carousel?.car_img}`}/>:null}
                    <button type="submit" className="w-full text-white bg-blue-800 p-5 mt-5 rounded-lg">Update</button>
                </form>
            }
        </>
    );
}
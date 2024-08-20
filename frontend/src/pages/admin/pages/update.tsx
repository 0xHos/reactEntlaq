import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosGetData, useAxiosUpdateData } from "../../../hooks/useFetch";
import { Carousel } from "../../../types";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { SectionOptionDropdown } from "../data";
import MyDropzone from "../components/dropzone";
import JoditEditor from "jodit-react";

export default function Update(){
    const {page,section,id} = useParams();
    const {getData} = useAxiosGetData();
    const {updatedData} = useAxiosUpdateData();
    const [file, setFile] = useState(null);
    const [carousel,setCarousel] = useState<Carousel>({});
    const [inputX,setInputX] = useState();
    const refI = useRef([])

    const refCar_title = useRef();
    const refCar_content = useRef();
    const refCar_link = useRef();


    

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
                        inputX?.map((ei,i)=>{
                            console.log("+==============",ei)

                            return(
                                <div className="w-full   rounded-lg" key={i*4}>
                                    <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">{ei?.show_name}</label>
                                    {
                                        carousel[`${ei?.name}`] != null ?
                                        // <textarea onChange={handleInputChange} name={`${inx?.name}`} value={carousel[`${inx?.name}`]} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                                            (  
                                                ei?.name != 'car_link' ?
                                                    <JoditEditor
                                                        ref={ element => refI.current[i] = element }
                                                        value={carousel[`${ei?.name}`]}
                                                        name={ei.name}
                                                        onChange={(ex) =>{
                                                        setCarousel((prev: Carousel) =>  ({...prev, [ei.name]:ex}))}}
                                                    />:
                                                <input 
                                                    onChange={(e)=>{ setCarousel((prev: Carousel) =>  ({...prev, car_link:e.target.value}))}}
                                                    name={`car_link`} value={carousel?.car_link} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg"
                                                /> 
                                            )  
                                        :null
                                    }
                                </div>
                            );
                        })
                    }
                    {
                         page == 'home' && section == 'about_us'?
                        <> 
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Title</label> 
                                <JoditEditor
                                            ref={ refCar_title }
                                            value={carousel.car_title}
                                            name='car_title'
                                            onChange={(ex) =>{
                                            setCarousel((prev: Carousel) =>  ({...prev, car_title:ex}))}}
                                />
                            </div>
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Content</label> 
                                <JoditEditor
                                            ref={ refCar_content }
                                            value={carousel.car_content}
                                            name='car_content'
                                            onChange={(ex) =>{
                                            setCarousel((prev: Carousel) =>  ({...prev, car_content:ex}))}}
                                        />                            
                            </div>
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Link</label> 
                                <input 
                                        onChange={(e)=>{
                                            setCarousel((prev: Carousel) =>  ({...prev, car_link:e.target.value}))}
                                        }
                                        
                                    name={`car_link`} value={carousel?.car_link} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            
                            </div>
                        </>
                        :null
                     }


                    {
                         page == 'home' && section == 'partner_text'?
                        <> 
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Title</label> 
                                <JoditEditor
                                            ref={ refCar_title }
                                            value={carousel.car_title}
                                            name='car_title'
                                            onChange={(ex) =>{
                                            setCarousel((prev: Carousel) =>  ({...prev, car_title:ex}))}}
                                />                            
                            </div>
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Content</label> 
                                <JoditEditor
                                            ref={ refCar_content }
                                            value={carousel.car_content}
                                            name='car_content'
                                            onChange={(ex) =>{
                                            setCarousel((prev: Carousel) =>  ({...prev, car_content:ex}))}}
                                /> 
                            </div>
                        </>
                        :null
                     }

                    {
                         page == 'home' && section == 'our_services_link_2'?
                        <> 
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Link</label> 
                                <input 
                                        onChange={(e)=>{
                                            setCarousel((prev: Carousel) =>  ({...prev, car_link:e.target.value}))}
                                        }
                                        
                                    name={`car_link`} value={carousel?.car_link} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
                            </div>
                        </>
                        :null
                     }

                    {
                         page == 'home' && section == 'our_services_link'?
                        <> 
                            <div className="w-full rounded-lg">
                                <label htmlFor="page" className="block mb-2  font-bold text-lg text-gray-900">Link</label> 
                                <input 
                                        onChange={(e)=>{
                                            setCarousel((prev: Carousel) =>  ({...prev, car_link:e.target.value}))}
                                        }
                                        
                                    name={`car_link`} value={carousel?.car_link} className=" w-full border-2 rounded-lg shadow-inner p-5 text-lg" rows={5} />
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
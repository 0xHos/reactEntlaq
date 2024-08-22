import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { useAxiosDeleteData, useAxiosGetData, useAxiosUpdateData } from "../../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import JoditEditor from "jodit-react";
import { Carousel } from "../../../types";
import MyDropzone from "../components/dropzone";

export default function ReportEdite(){
    const {id} = useParams();
    const [images,setImages] = useState([]);
    const { getData } = useAxiosGetData();
    const {deleteData} = useAxiosDeleteData();
    const {updatedData} = useAxiosUpdateData();
    const [file, setFile] = useState(null);
    const [carousel,setCarousel] = useState<Carousel>({});
    const refCar_title = useRef();
    const refCar_content = useRef();

    const fetchImages = async () => {
        const res = await getData(`${BACKEND_SERVER}/api/gallery/${id}`, sessionStorage.getItem("token") || "");
        setImages(res);
        console.log(res);
    };
    const endpointCarousel = `${ENDPOINT_CAROUSEL}/report/header/${id}`
    const getCarouselData = async()=>{

            const res =  await  getData(endpointCarousel,"");
            setCarousel(res?.carousels);
    }
    useEffect(() => {
        fetchImages();
        getCarouselData();
    }, []);
    

    const  handleDelete  = async(event) =>{
        const res = await deleteData(`${BACKEND_SERVER}/api/gallery/image/${event.target.value}`,sessionStorage.getItem("token") || "")
        alert(res.msg);
        location.reload();
    }
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
            <form onSubmit={handleSubmit}>
                <div>
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
    {carousel?.car_img != null ?<MyDropzone onFileChange={handleFileChange} initialImage={`${BACKEND_SERVER}/uploads/${carousel?.car_img}`}/>:null}
    <button type="submit" className="w-full text-white bg-blue-800 p-5 mt-5 rounded-lg">Update</button>

            </form>


            <div className="mt-52">
          <h1 className="bg-slate-200 p-5 text-gray-950 font-extrabold text-lg">Report File</h1>
        <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Report</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images?.map((image: any) => (
                           image.section == "report_report_header"?
                           <tr key={image.id} className="hover:bg-slate-100">
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                <object data={`${BACKEND_SERVER}/uploads/${image.car_img}`} type="application/pdf" width="600" height="400">
                                </object>
                           </td>
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <button value={image.id} onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
                           </td>
                       </tr>:null
                        ))}
                    </tbody>
                </table>
            </div>
          </div>



          <div className="mt-52">
          <h1 className="bg-slate-200 p-5 text-gray-950 font-extrabold text-lg">Video Header</h1>
        <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Video</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images?.map((image: any) => (
                           image.section == "video_report_header"?
                           <tr key={image.id} className="hover:bg-slate-100">
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                <video className="h-24 rounded-xl" src={`${BACKEND_SERVER}/uploads/${image.car_img}`} />

                           </td>
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <button value={image.id} onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
                           </td>
                       </tr>:null
                        ))}
                    </tbody>
                </table>
            </div>
          </div>


          <div className="mt-52">
          <h1 className="bg-slate-200 p-5 text-gray-950 font-extrabold text-lg">Header Images</h1>
        <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images?.map((image: any) => (
                           image.section == "header"?
                           <tr key={image.id} className="hover:bg-slate-100">
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <img className="h-44 w-44 rounded-xl" src={`${BACKEND_SERVER}/uploads/${image.car_img}`} alt={image.title} />
                           </td>
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <button value={image.id} onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
                           </td>
                       </tr>:null
                        ))}
                    </tbody>
                </table>
            </div>
          </div>


          <div>
          <h1 className="bg-slate-200 p-5 text-gray-950 font-extrabold text-lg">Partners Images</h1>
        <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images?.map((image: any) => (
                           image.section == "partners"?
                           <tr key={image.id} className="hover:bg-slate-100">
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <img className="h-44 w-44 rounded-xl" src={`${BACKEND_SERVER}/uploads/${image.car_img}`} alt={image.title} />
                           </td>
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <button value={image.id} onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
                           </td>
                       </tr>:null
                        ))}
                    </tbody>
                </table>
            </div>
          </div>

          <div>
          <h1 className="bg-slate-200 p-5 text-gray-950 font-extrabold text-lg">Videos</h1>
        <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Video</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images?.map((image: any) => (
                           image.section == "videos"?
                           <tr key={image.id} className="hover:bg-slate-100">
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <video className="h-24 rounded-xl" src={`${BACKEND_SERVER}/uploads/${image.car_img}`} />
                           </td>
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <button value={image.id} onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
                           </td>
                       </tr>:null
                        ))}
                    </tbody>
                </table>
            </div>
          </div>





          <div>
          <h1 className="bg-slate-200 p-5 text-gray-950 font-extrabold text-lg">Insights Images</h1>
        <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images?.map((image: any) => (
                           image.section == "insights"?
                           <tr key={image.id} className="hover:bg-slate-100">
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <img className="h-44 w-44 rounded-xl" src={`${BACKEND_SERVER}/uploads/${image.car_img}`} alt={image.title} />
                           </td>
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <button value={image.id} onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
                           </td>
                       </tr>:null
                        ))}
                    </tbody>
                </table>
            </div>
          </div>



          <div>
          <h1 className="bg-slate-200 p-5 text-gray-950 font-extrabold text-lg">News Images</h1>
        <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images?.map((image: any) => (
                           image.section == "news"?
                           <tr key={image.id} className="hover:bg-slate-100">
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <img className="h-44 w-44 rounded-xl" src={`${BACKEND_SERVER}/uploads/${image.car_img}`} alt={image.title} />
                           </td>
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                               <button value={image.id} onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
                           </td>
                       </tr>:null
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </>
    );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { useAxiosDeleteData, useAxiosGetData } from "../../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function GalleryEdite(){
    const {id} = useParams();
    const [images,setImages] = useState([]);
    const { getData } = useAxiosGetData();
    const {deleteData} = useAxiosDeleteData();

    const fetchImages = async () => {
        const res = await getData(`${BACKEND_SERVER}/api/gallery/${id}`, sessionStorage.getItem("token") || "");
        setImages(res);
    };

    useEffect(() => {
        fetchImages();
    }, []);
    

    const  handleDelete  = async(event) =>{
        const res = await deleteData(`${BACKEND_SERVER}/api/gallery/image/${event.target.value}`,sessionStorage.getItem("token") || "")
        alert(res.msg);
        location.reload();
    }

    return(
        <>
          <div className="flex flex-wrap">
                {
                     images?.map((image: any) => (
                        <div key={image.id} className="w-1/4 flex-col items-center justify-center">
                            <button value={image.id} onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
                            <img className="size-52 rounded-xl" src={`${BACKEND_SERVER}/uploads/${image?.car_img}`} alt={image.title} />
                        </div>
                    ))
                }
          </div>
        </>
    );
}
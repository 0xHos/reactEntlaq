import { faTrash, faEdit, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAxiosDeleteData } from "../../../hooks/useFetch";
import { ENDPOINT_CAROUSEL } from "../../../config";

export default function ButtonMore(props:{id:number}){

    const [isOpen,setIsOpen] = useState(false);
    const {deleteData} = useAxiosDeleteData();
    
    const handelOpen = ()=>{
        setIsOpen(!isOpen);
    }

    const handleDelete = async()=>{

        const deleteEndpoint = `${ENDPOINT_CAROUSEL}/${props.id}`;
        const token = sessionStorage.getItem("token")||'';

        try{
            const res = await deleteData(deleteEndpoint,token);
            
            if(res.msg){
                alert(res.msg);
                location.reload();
            }
        }catch(err){
            console.log(err);
        }
    }

    const handelUpdate = ()=>{
        const updateEndpoint = `${ENDPOINT_CAROUSEL}/${props.id}`;

    }

  


    return(
        <>
         <td onClick={handelOpen}><FontAwesomeIcon icon={faEllipsisH} className="text-2xl hover:cursor-pointer relative"/>
            {isOpen?<div className="bg-white shadow-lg border-2 rounded-lg absolute right-10 flex flex-col p-4 z-10">
                    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1"><FontAwesomeIcon icon={faTrash} className="text-2xl"/> Delete</button>
                    {/* <hr/> */}
                    {/* <button onClick={handelUpdate} className="text-blue-800 hover:text-blue-700 px-2 py-1"><FontAwesomeIcon icon={faEdit} className="text-2xl"/> Edit</button> */}
            </div> :null}                            
         </td>
            
        </>
    );
}
import { faTrash, faEdit, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAxiosDeleteData } from "../../../hooks/useFetch";
import { ENDPOINT_CAROUSEL } from "../../../config";
import { Link, useNavigate } from "react-router-dom";

export default function ButtonMore(props:{page:string,section:string,id:string}){

    const [isOpen,setIsOpen] = useState(false);
    const {deleteData} = useAxiosDeleteData();
    const navigate = useNavigate();
    
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
        // const updateEndpoint = `${ENDPOINT_CAROUSEL}/${props.id}`;
        // const token = sessionStorage.getItem("token")||'';
        navigate(`admin/update/${props?.id}`)

    }

  


    return(
        <>
         <td >
            <div className="">
                    <button onClick={handleDelete} className="inline text-red-500 hover:text-red-700 px-2 py-1"> Delete</button>|
                    <Link  className="inline text-blue-800 hover:text-blue-700 px-2 py-1" to={`/admin/dashboard/update/${props?.page}/${props?.section}/${props?.id}`}> Edit</Link>
            </div>                            
         </td>
            
        </>
    );
}
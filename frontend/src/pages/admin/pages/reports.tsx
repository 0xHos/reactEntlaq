import { useState, useEffect } from "react";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../../config";
import { useAxiosDeleteData, useAxiosGetData } from "../../../hooks/useFetch";
import { Carousel, Message } from "../../../types";
import MessageDetails from "./show_message";

const ButtonMore = ({id , message})=>{
    const {deleteData} = useAxiosDeleteData();
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = async()=>{

        const deleteEndpoint = `${BACKEND_SERVER}/api/gallery/${id}`;
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
    const handelShowMessage = ()=>{
        setShowPopup(!showPopup)
        
    }
    return(
        <>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700 px-2 py-1">Delete</button>|
            {/* <button onClick={handelShowMessage} className="text-blue-500 hover:text-blue-950 px-2 py-1">show</button> */}
            {showPopup?<MessageDetails message={message} handelClose={handelShowMessage}/>:null}
        </>
    );
}


export default function Reports(){
    const [reports, setReports] = useState<Carousel[]>([]);
    const { getData } = useAxiosGetData();

    const fetchMessages = async () => {
        const res = await getData(`${ENDPOINT_CAROUSEL}/report/`, sessionStorage.getItem("token") || "");
        setReports(res.carousels);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            {/* <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th> */}
                            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {reports?.map((report:Carousel) => (
                            <tr key={report.id} className="hover:bg-gray-100">
                                {/* <td className="px-6 py-4 border-b border-gray-200 text-sm">{message?.id}</td> */}
                                <td className="px-6 py-4 border-b border-gray-200 text-sm">{report?.car_title?.slice(0, 20)}{report?.car_title?.length > 20 && "..."}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm"><ButtonMore id={report?.id} message={{}}/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
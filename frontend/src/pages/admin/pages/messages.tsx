import { useState, useEffect } from "react";
import { useAxiosDeleteData, useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER } from "../../../config";
import { Message } from "../../../types";
import MessageDetails from "./show_message";





const ButtonMore = ({id , message})=>{
    const {deleteData} = useAxiosDeleteData();
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = async()=>{

        const deleteEndpoint = `${BACKEND_SERVER}/api/messages/${id}`;
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
            <button onClick={handelShowMessage} className="text-blue-500 hover:text-blue-950 px-2 py-1">show</button>
            {showPopup?<MessageDetails message={message} handelClose={handelShowMessage}/>:null}
        </>
    );
}


export default function Messages() {
    const [messages, setMessages] = useState([]);
    const { getData } = useAxiosGetData();

    const fetchMessages = async () => {
        const res = await getData(`${BACKEND_SERVER}/api/messages`, sessionStorage.getItem("token") || "");
        setMessages(res?.reverse());
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <strong>Messages:</strong> {messages.length}
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            {/* <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th> */}
                            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {messages?.map((message:Message) => (
                            <tr key={message.id} className="hover:bg-gray-100">
                                {/* <td className="px-6 py-4 border-b border-gray-200 text-sm">{message?.id}</td> */}
                                <td className="px-6 py-4 border-b border-gray-200 text-sm">{message?.name?.slice(0, 20)}{message?.name?.length > 20 && "..."}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm">{message?.email?.slice(0, 20)}{message?.email?.length > 20 && "..."}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm">{message?.subject?.slice(0, 20)}{message?.subject?.length > 20 && "..."}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm">{message?.message?.slice(0, 20)}{message?.message?.length > 20 && "..."}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm"><ButtonMore id={message?.id} message={message}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

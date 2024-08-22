import { useEffect, useState } from "react";
import { useAxiosDeleteData, useAxiosGetData } from "../../../hooks/useFetch";
import { BACKEND_SERVER } from "../../../config";
import { UserSub } from "../../../types";

export default function Subscription(){
    const {getData} = useAxiosGetData();
    const [users,setUsers] = useState<UserSub[]>()
    const {deleteData} = useAxiosDeleteData();

    const handleDelete = async(id)=>{
        
        const deleteEndpoint = `${BACKEND_SERVER}/api/users/users_sub/${id}`;
        console.log(deleteEndpoint);
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

    useEffect(()=>{
        async function fetchUsersSub(){
                const res = await getData(`${BACKEND_SERVER}/api/users/users_sub`, sessionStorage.getItem("token") || "")
                setUsers(res.users);
        }


        fetchUsersSub();
    },[])

    return(
        <>
               <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.last_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="hover:text-red-700 text-red-500 font-bold py-2 px-4 rounded"
                  onClick={
                    ()=>{
                        handleDelete(user?.id);
                    }
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    );
}
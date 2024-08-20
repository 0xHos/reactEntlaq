import axios from "axios";
import { ENDPOINT_CAROUSEL } from "../config";
import { useState } from "react";

export default function useAxiosSendData() {
    const sendData =  async (url:string,data:unknown ,token:string)=>{
        try{
          const response = await axios.post(url, data,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'token':token
                },
              }
          );
          if(response.status == 401){
            sessionStorage.removeItem("token");location.reload()
          }
          return response.data;
        }catch(err){
          console.log(err);
        }
    }
    return {sendData};
  }





  
export  function useAxiosGetData(){
  const [loading ,setLoading] = useState(false)
   const getData = async(url:string,token:string)=>{
      try{
        setLoading(true);
        const response = await fetch(url,{method:'GET', headers: {'Content-Type': 'application/json' , 'token':token}});
        const data =  await response.json();
        if(response.status == 401){
          sessionStorage.removeItem("token");location.reload()
        }
        setLoading(false);
        return data;
      }catch(err){
        console.log(err)
      }
   }
   return {getData,loading};
} 


export function useAxiosDeleteData(){
   const deleteData = async(url:string,token:string)=>{
      try{
        const response = await fetch(url,{method:'DELETE', headers: {'Content-Type': 'application/json' , 'token':token}});
        const data =  await response.json();
        if(response.status == 401){
          sessionStorage.removeItem("token");location.reload()
        }
        return data;
      }catch(err){
        console.log(err)
      }
   }
   return {deleteData};
}


export function useAxiosUpdateData(){
  const updatedData =  async (url:string,data:unknown ,token:string)=>{
    try{
      const response = await axios.put(ENDPOINT_CAROUSEL, data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'token':token
            },
          }
      );
      if(response.status == 401){
        sessionStorage.removeItem("token");location.reload()
      }
      return response.data;
    }catch(err){
      console.log(err);
    }
}
return {updatedData};
}
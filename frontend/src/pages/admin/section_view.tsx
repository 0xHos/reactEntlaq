
import { useParams } from "react-router-dom";
import { useAxiosGetData } from "../../hooks/useFetch";
import { BACKEND_SERVER, ENDPOINT_CAROUSEL } from "../../config";
import { useEffect, useState } from "react";
import { Carousel } from "../../types";
import ButtonMore from "./components/buttonMore";

export default  function SectionView(){
    const init:Carousel[] =[] 
    const [data,setData] = useState(init);
    const { page,section } = useParams();
    const {getData} = useAxiosGetData();
    const token = sessionStorage.getItem("token")||'';
    const endpoint = `${ENDPOINT_CAROUSEL}/${page}/${section}`;
    const table_header = data[0] as Carousel||{};
    
    useEffect(()=>{
        getData(endpoint,token).then((res:Carousel[])=>{
            setData(res);
        });
    },[page, section]);
       
    return(


        <>
        <div className=" h-screen overflow-y-auto container mx-auto p-4">
            <table className="w-full min-w-full bg-white border border-gray-300 " >
                   <thead>
                        <tr className="font-extrabold text-gray-500 h-20">
                                {table_header.car_img != null?<th className="w-1/12 px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>:null}
                                {table_header.car_title != null?<th  className="text-start w-2/12 px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>:null}
                                {table_header.car_content != null?<th  className="text-start px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Content</th>:null}
                                {table_header.car_link != null?<th className="text-start px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Link</th>:null}
                                {table_header.car_link_text != null ?<th  className="text-start px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Link Text</th>:null}
                                {table_header.car_name != null?<th  className="text-start px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>:null}
                                {table_header.car_job != null?<th  className="text-start px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>:null}
                                <th  className="text-start w-2/12 px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                   </thead>
                <tbody className="">
                    {
                        data?.map((carousel:Carousel,index:number)=>{
                            return(
                                <tr className="bg-white  border-b hover:bg-gray-100" key={index}>
                                    {carousel.car_img != null ?<td className=" py-4 border-b border-gray-200 text-sm"><img className="size-24 rounded-full p-4" src={`${BACKEND_SERVER}/uploads/${carousel.car_img}`}/></td>:null}
                                    {carousel.car_title != null ?<td className="px-6 py-4 border-b border-gray-200 text-sm">{carousel.car_title.substring(0,20)}</td>:null}
                                    {carousel.car_content != null ?<td className="px-6 py-4 border-b border-gray-200 text-sm">{carousel.car_content.substring(0,30)}</td>:null}
                                    {carousel.car_link != null ?<td className="px-6 py-4 border-b border-gray-200 text-sm">{carousel.car_link.substring(0,30)}</td>:null}
                                    {carousel.car_link_text != null ?<td className="px-6 py-4 border-b border-gray-200 text-sm">{carousel.car_link_text.substring(0,30)}</td>:null}
                                    {carousel.car_name != null ?<td className="px-6 py-4 border-b border-gray-200 text-sm">{carousel.car_name.substring(0,30)}</td>:null}
                                    {carousel.car_job != null ?<td className="px-6 py-4 border-b border-gray-200 text-sm">{carousel.car_job.substring(0,30)}</td>:null}
                                   <ButtonMore page={carousel?.page} section={carousel?.section}  id={carousel?.id}/>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}
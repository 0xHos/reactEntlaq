import React, {createContext, useState } from "react";
import { Admin, AdminProviderProps } from "../types";




export const AdminContext = createContext<Admin|null>(null);


export function AdminProvider({children}:AdminProviderProps){
    const [pageAndSection,setPageAndSection] = useState({page:'',section:''});
    const [token,setToken] = useState("");
    const [view,setView] = useState<React.ReactNode>("");


    return(
        <AdminContext.Provider value={{pageAndSection,setPageAndSection ,view ,setView ,token,setToken}}>
            {children}
        </AdminContext.Provider>
    );
}

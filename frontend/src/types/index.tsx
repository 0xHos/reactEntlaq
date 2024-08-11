import ButtonCGM from "../pages/admin/button_CGM";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Admin{
    pageAndSection:{page:string,section:string};
    setPageAndSection:React.Dispatch<React.SetStateAction<{page:string,section:string}>>;
    view: React.ReactNode;
    setView: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    token:string;
    setToken:React.Dispatch<React.SetStateAction<string>>;

}

export interface AdminProviderProps {
    children: React.ReactNode;
}

export interface User{
    username:string;
    password:string;
}

export interface ButtonCGM{
    icon:IconProp;
    handelClick:React.MouseEventHandler<HTMLButtonElement>;
}


export interface Carousel{
    id?:number;
    page?:string;
    section?:string;
    car_img?:string;
    car_title?:string;
    car_content?:string;
    car_link?:string;
    car_link_text?:string;
    car_name?:string;
    car_job?:string;

}

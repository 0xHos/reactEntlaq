
export interface Carousel{
    id?:number;
    page:string;
    section:string;
    car_img?:string|null;
    car_title?:string|null;
    car_content?:string|null;
    car_link?:string|null;
    car_link_text?:string|null;
    car_name?:string|null;
    car_job?:string|null;

}



export interface Message{
    id?:number;
    name:string;
    email:string;
    subject:string;
    message:string;

}

export interface User{
    id?:string;
    username:string;
    password:string;
}

export interface Gallery{

    id? :number;
    car_img: string;
    section?: string;
    link?: string;
    id_car: number;
    
}




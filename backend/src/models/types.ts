
export interface Carousel{
    id?:number;
    page:string;
    section:string;
    car_img?:string;
    car_title?:string;
    car_content?:string;
    car_link?:string;
    car_link_text?:string;
    car_name?:string;
    car_job?:string;

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




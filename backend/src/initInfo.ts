import axios from "axios";
import { PORT } from "./config";

async function createAdmin(){
    // this for create admin 
   await axios.post(`//localhost:${PORT}/api/users/createAccount`,{"username":"admin", "password":"12345" },{headers: {'Content-Type': 'application/json',},})

}

async function login(){
   
    // this for login and get token
    const response = await axios.post(`//localhost:${PORT}/api/users/login`,{"username":"admin", "password":"12345" },{headers: {'Content-Type': 'application/json',},});
    return response.data.token;

}

async function  insertAboutUs(){
    const token =  await login()


    const responseAboutUs = await axios.post(`//localhost:${PORT}/api/carousels/`,
        {   "page":"home",
            "section":"about_us",
            "car_title":"Reshaping the entrepreneurial landscape in Egypt.",
            "car_content":`Cairo-based think tank focused on advisory services and
                            capacity building programs.
                            Leveraging our extensive network of governmental and
                            ecosystem stakeholders, Entlaq's team is committed to
                            addressing the needs of governmental, investor, and
                            entrepreneurial stakeholders and providing a unique
                            perspective on the entrepreneurial ecosystem.`,
            "car_link":"https://www.facebook.com"
         },{headers: {'token':token ,'Content-Type': 'application/json',},});
    
    const  responseOurServicesLink = await axios.post(`//localhost:${PORT}/api/carousels/`,
        {   "page":"home",
            "section":"our_services_link",
            "car_link":"https://www.facebook.com"
         },{headers: {'token':token ,'Content-Type': 'application/json',},});   
    const  responseOurServicesLink_2 = await axios.post(`//localhost:${PORT}/api/carousels/`,
            {   "page":"home",
                "section":"our_services_link_2",
                "car_link":"https://www.x.com"
             },{headers: {'token':token ,'Content-Type': 'application/json',},});      
    const responseEntlaqPartener = await axios.post(`//localhost:${PORT}/api/carousels/`,
                {   "page":"home",
                    "section":"partner_text",
                    "car_title":"An overview of Entlaq’s partners.",
                    "car_content":`Leveraging our extensive network of governmental,
                                    international and regional, corporate partners, IOs
                                    and international banks, ecosystem partners,
                                    Entlaq's team is committed to addressing the needs
                                    of governmental, investor, and entrepreneurial
                                    stakeholders and providing a unique perspective on
                                    the entrepreneurial ecosystem.`,
                 },{headers: {'token':token ,'Content-Type': 'application/json',},});
}

async function initInfo(){
    // await createAdmin();
    await insertAboutUs();
}


initInfo();
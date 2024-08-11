import { User } from "../types";
import { BACKEND_SERVER } from "../config";

export default  function useLogin() {

  
    const login = async (user:User)=>{
        try{
            const response = await fetch(`${BACKEND_SERVER}/api/users/login`,{method:'POST', headers: {'Content-Type': 'application/json'},body:JSON.stringify(user)});
            const data =  await response.json();
            return data;
        }catch(e){
            console.log(e);
        }
    }

    return {login};
}
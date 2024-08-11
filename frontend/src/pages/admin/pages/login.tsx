import { FormEvent, useEffect, useState } from "react";
import { User } from "../../../types";
import useLogin from "../../../hooks/login";
import { useNavigate } from "react-router-dom";




export default function Login(){

    const [user, setUser] = useState<User>({ username: '', password: '' });
    const {login} =  useLogin();
    const [err,setErr] = useState("");
    const navigate = useNavigate();

   useEffect(()=>{
    window.onload =()=>{
        sessionStorage.getItem('token') !== undefined?navigate('/admin/dashboard'):null;
    }
    
   },[]);
    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev: User) =>  ({...prev, [event.target.name]: event.target.value}))
    };

    

    const handleSubmit =  async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await login(user);
            if(!res.err) {
                sessionStorage.setItem("token",res.token);
                navigate('/admin/dashboard')
            }else{
                setErr(res.err);
            }
        } catch (err) {
            console.log(err);
            
        }
        
       
    };
        return(
            <>  
                <section className="bg-gray-50 dark:bg-gray-900 h-screen overflow-hidden">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Admin Login</h1>
                                {err && <div className="text-red-500 text-xs mb-2">* check username or password</div>}
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                                        <input onBlur={handleInput} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required></input>
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input onBlur={handleInput} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-800 p-5 mt-5 rounded-lg">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );

    }



  

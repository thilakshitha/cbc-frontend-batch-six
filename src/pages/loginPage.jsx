import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const navigate = useNavigate()

    function login(){
        console.log(email,password)
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login",{
            email:email,
            password:password
        }).then(
            (response)=>{
              console.log(response.data)
              localStorage.setItem("token",response.data.token)

              toast.success("login successful")
              if(response.data.role == "admin"){
                navigate("/admin")
                //goto admin page
              }else if(response.data.role == "user"){
                //go to user page
                navigate("/home")
              }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("login fail")
            }
        )
        
    }

    return(
        <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center">
            <div className="w-[500px] h-[500px] backdrop-blur-2xl shadow rounded-[30px] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-center my-5 absolute top-[20px]">login</h1>
                 <div className="w-[350px]  flex  flex-col">
                    <span className="text-xl font-bold ">email</span>
                    <input onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    } type="text" className="w-[350px] h-[60px] border rounded-2xl" />
                 </div>
                  <div className="w-[350px]  flex  flex-col">
                    <span className="text-xl font-bold ">password</span>
                    <input onChange={
                        (e)=>{
                            console.log(e.target.value)
                            setPassword(e.target.value)
                            
                        }
                    } type="password" className="w-[350px] h-[60px] border rounded-2xl" />
                 </div>
                 <button onClick={login} className="w-[350px] h-[40px] bg-blue-800 rounded-2xl text-white text-lg mt-5 hover:bg-blue-400 transition-all duration-300">login</button>
                 <p>Dont have an account? <Link to="/register" className="text-blue-700">click here</Link></p>
            </div>
            
        </div>
    )
}
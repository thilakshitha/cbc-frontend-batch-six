import { useEffect, useState } from "react"


import { TbTrash } from "react-icons/tb"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
   

    const location = useLocation();
    const navigate = useNavigate();

    const [user,setUser] = useState(null)
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState(""); 

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token == null){
            navigate("/login");
            return;
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            }).then(
                (res)=>{
                    setUser(res.data);
                    setName(res.data.firstName+ " " +res.data.lastName)
                }
            ).catch(
            (err)=>{
                console.error(err)
                toast.error("failed to fetch user details");
                // navigate("/login");
            }
            )
        }
    },[])

    const [cart, setCart] = useState(location.state.items || []);
    

    if(location.state.items == null){
        toast.error("please select items to checkout")
        navigate("/products")
    }
    function getTotal(){
        
        let total = 0;
        cart.forEach((item=>{
            total+= item.quantity*item.price
        }))
        return total;
    }

    async function placeOrder(){
       const token = localStorage.getItem("token")
       if(token == null){
        toast.error("please login to the place order")
        navigate("/login")
        return;
       }
       if(name == "" || address == "" || phone == ""){
        toast.error("please fill all fields");
        return;
       }
       const order = {
        address: address,
        phone: phone,
        items: []
       };

       cart.forEach((item)=>{
        order.items.push({
            productId:item.productId,
            qty: item.quantity
        })
       });

       try{
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order,{
            headers : {
                Authorization: `Bearer ${token}`
            },
        })
        toast.success("order placed succesfully");
        navigate("/products");

       }catch(err){
        console.error(err)
        toast.error("failed to place order")
        return;
       }
    }
    


    return (
        <div className="w-full h-screen flex flex-col items-center py-[40px]">
            {
                cart.map(
                    (item,index) => {
                        return (
                            <div key={item.productId} className="w-[800px] h-[100px] m-[10px]  shadow-2xl flex flex-row items-center">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover" />
                                <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                                    <span className=" font-bold">{item.name}</span>
                                    <span className=" ">{item.price}</span>
                                </div>
                                <div className="w-[190px] h-full  flex flex-row justify-center items-center">
                                    <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-400 " onClick={
                                        () => {
                                           const newCart = [...cart]
                                           newCart[index].quantity-=1;
                                           setCart(newCart)
                                        }
                                    }>-</button>
                                    <span className="mx-[10px]">{item.quantity}</span>
                                    <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-400 " onClick={
                                        () => {
                                           const newCart = [...cart]
                                           newCart[index].quantity+=1;
                                           setCart(newCart)
                                        }
                                    }>+</button>
                                </div>
                                <div className="w-[190px] h-full flex justify-end items-center pr-[10px]">{/*total quantity * price*/}
                                    <span className="font-semibold" >{(item.quantity * item.price).toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <button className="cursor-pointer w-[30px] h-[30px] absolute right-[100px] bg-red-500 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-400 hover:bg-white hover:text-red-500" onClick={
                                    () => {
                                       
                                    }
                                }>
                                    <TbTrash className="text-xl" />
                                </button>
                            </div>
                        )
                    }
                )
            }
            

            <div className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center justify-end p-[10px] relative">
                <span className="font-bold text-2xl ">
                    Total: {getTotal().toLocaleString("en-US",{ minimumFractionDigits:2,maximumFractionDigits:2})}
                </span>
                <button className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow bg-blue-700 border-[2px] border-blue-700 text-white hover:bg-white hover:text-blue-700"
                onClick={placeOrder}>
                    place order
                </button>
            </div>

            <div className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center justify-center p-[10px] relative">
                <input className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] m-[10px]" 
                type="text"
                placeholder="enter your name"
                value = {name}
                onChange={(e)=>setName(e.target.value)} />

                <input className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] m-[10px]" 
                type="text"
                placeholder="enter your address"
                value = {address}
                onChange={(e)=>setAddress(e.target.value)} />

                <input className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] m-[10px]" 
                type="text"
                placeholder="enter your phone No."
                value = {phone}
                onChange={(e)=>setPhone(e.target.value)} />
            </div>


        </div>
    )
}
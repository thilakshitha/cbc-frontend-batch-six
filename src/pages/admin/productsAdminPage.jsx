import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiTrash } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";

const sampleProducts = [];


export default function ProductsAdminPage(){
   const[products,setProducts] = useState(sampleProducts)
   const[a,setA]=useState(0)

   useEffect(
    ()=>{
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
    (res)=>{
         setProducts(res.data)
    }
   )
    },[a]
   )
   const navigate = useNavigate()
  
   return(
    <div className="w-full h-full  border-[3px]">
       <table>
         <thead>
            <tr>
                <th className="p-[10px]">image</th>
                <th className="p-[10px]">product id</th>
                <th className="p-[10px]">Name</th>
                <th className="p-[10px]">Price</th>
                <th className="p-[10px]">lable Price</th>
                <th className="p-[10px]">Category</th>
                <th className="p-[10px]">Stock</th>
                <th className="p-[10px]">Actions</th>
               
            </tr>
         </thead>
         <tbody>
            {
                products.map(
                    (product,index)=>{
                        return(
                            <tr key={product.productId}>
                                <td>
                                    <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px]" />
                                </td>
                                <td className="p-[10px]">{product.productId}</td>
                                <td className="p-[10px]">{product.name}</td>
                                <td className="p-[10px]">{product.price}</td>
                                <td className="p-[10px]">{product.labelledPrice}</td>
                                <td className="p-[10px]">{product.category}</td>
                                <td className="p-[10px]">{product.stock}</td>
                                <td className="p-[10px]">
                                    <BiTrash className="bg-red-600 p-[5px] text-3xl rounded-full text-white cursor-pointer" onClick={
                                        ()=>{
                                            const token = localStorage.getItem("token");
                                            if(token == null){
                                                navigate("/login")
                                                return
                                            }
                                            axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/"+ product.productId,
                                                {
                                                    headers:{
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                }
                                            ).then(
                                                (res)=>{
                                                   console.log("product deleted succeessfully")
                                                   console.log(res.data)
                                                   toast.success("product deleted successfully")
                                                   setA(a+1)
                                                }
                                            ).catch(
                                                (error)=>{
                                                    toast.error("failed to delete product")
                                                    console.log("failed to delete product",error)
                                                }
                                            )
                                              

                                        }
                                    }/>
                                </td>
                            </tr>
                        )

                    }
                )
            }
         </tbody>
       </table>
        
        <Link to="/admin/newProduct"  className="fixed right-[60px] bottom-[60px] bg-black p-[20px] rounded-full shadow-2xl cursor-pointer">
            
            <BiPlus className="text-3xl text-white"/>
        </Link>
    </div>
   )
}
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";




export default function ProductsAdminPage(){
   const[products,setProducts] = useState([])
   //const[a,setA]=useState(0)
   const[isLoading, setIsLoading] = useState(true)

   useEffect(
    ()=>{
        if(isLoading){
              axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
              (res)=>{
                 setProducts(res.data)
                 setIsLoading(false);
    }
   )
}
    },[isLoading]
   )
   const navigate = useNavigate()
  
   return(
    <div className="w-full h-full  border-[3px]">
       {isLoading? (
             <Loader/>
        ):(<table>
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
                                <td className="p-[10px] flex flex-row justify-center items-center">
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
                                                   setIsLoading(!isLoading)
                                                }
                                            ).catch(
                                                (error)=>{
                                                    toast.error("failed to delete product")
                                                    console.log("failed to delete product",error)
                                                }
                                            )
                                              

                                        }
                                    }/>
                                    <BiEdit onClick={
                                        ()=>{
                                            navigate("/admin/updateProduct",{
                                                state:product
                                            })
                                        }
                                    } className="bg-blue-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer p-[7px]"/>
                                </td>
                            </tr>
                        )

                    }
                )
            }
         </tbody>
       </table>)}
        
        <Link to="/admin/newProduct"  className="fixed right-[60px] bottom-[60px] bg-black p-[20px] rounded-full shadow-2xl cursor-pointer">
            
            <BiPlus className="text-3xl text-white"/>
        </Link>
    </div>
   )
}
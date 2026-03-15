import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverViewPage(){
   

    const params = useParams()
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")
    const navigate = useNavigate();
    useEffect(
        
        ()=>{
            if(status === "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`).then(
                    (res)=>{
                        setProduct(res.data)
                        setStatus("success")
                    }
                ).catch(
                    
                   (error)=>{
                       setStatus("error")
                    }
                )
            }
        }, [status]
    )


   return(
    <div className="w-full h-full">
       {
        status == "loading" && <Loader/>
        
       }
       {
        status == "success" && <div className="w-full h-full flex flex-row">
            <div className="w-[49%] h-full flex flex-col items-center justify-center">
                  <ImageSlider images={product.images}/>
            </div>
              <div className="w-[49%] h-full flex flex-col items-center pt-[50px]">
                <h1 className="text-2xl font-bold">{product.name} <span className="font-light">{product.altNames}</span></h1>
                <p className="mt-[20px] text-lg">{product.description}</p>
                <div className="w-full flex flex-col items-center mt-[20px]">
                   {
                    product.labelledPrice > product.price?
                    <div>
                        <span className="text-2xl font-semibold  line-through mr-[20px]">{product.labelledPrice.toFixed(2)}</span>
                        <span className="text-3xl font-semibold  line-through">{product.price.toFixed(2)}</span>
                    </div>
                    :
                    <div>
                       <span className="text-3xl font-bold  line-through">{product.price.toFixed(2)}</span>
                    </div>
                   }
                </div>
                <div className="w-full flex flex-row justify-center items-center mt-[20px] gap-[10px] ">
                    <button className="w-[200px] h-[50px] bg-blue-900 cursor-pointer rounded-xl shadow-2xl text-white hover:bg-white hover:text-blue-600 border-[3px] border-blue-900" 
                    onClick={()=>{
                        navigate("/checkout",{state: {items: [{
                            productId: product.productId,
                            quantity: 1,
                            name: product.name,
                            image: product.images[0],
                            price: product.price

                        }]}});
                    }}>Buy now</button>
                    <button className="w-[200px] h-[50px] bg-blue-600 cursor-pointer rounded-xl shadow-2xl text-white  hover:bg-white hover:text-blue-600 border-[3px] border-blue-600" onClick={
                        ()=>{
                            addToCart(product,1)
                            toast.success("product added to cart")

                            console.log(getCart())
                        }
                    }>Add to cart</button>
                </div>
                 
            </div>
        </div>
       }
       {
        status == "error" && <div>error loading page</div>
       }
    </div>

    );
}
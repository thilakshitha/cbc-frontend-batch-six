import { Link } from "react-router-dom"

export default function ProductCard(props){
 const product = props.product
    return(
        <Link to={"/overview/"+product.productId} className="w-[300px] h-[400px]  shadow-2xl shrink-0 rounded-xl overflow-hidden flex flex-col">
           <img src={product.images[0]} className="w-full h-[275px] object-cover"  />
           <div className="w-full h-[calc(100%-275px)] bg-amber-300 flex flex-col">
             <span className="text-gray-500 text-[12px]">{product.productId}</span>
             <h1 className="text-lg font-bold">
                {product.name} {" "}
                <span className="text-gray-500 text-[12px]">{product.category}</span>
            </h1>
                <div>
                    {
                        product.labelledPrice>product.price?(
                        <p>
                            <span className="line-through mr-[10px]">{product.labelledPrice.toFixed(2)}</span>
                            <span>{product.price.toFixed(2)}</span>
                        </p>
                    ) : (
                       <span>{product.price.toFixed(2)}</span>
                    )}
                </div>
                
             
           </div>

        </Link>
    )
}
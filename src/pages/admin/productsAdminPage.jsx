import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ProductsAdminPage(){
   return(
    <div className="w-full h-full bg-amber-800 border-[3px]">
        
        <Link to="/admin/newProduct"  className="fixed right-[60px] bottom-[60px] bg-black p-[20px] rounded-full shadow-2xl cursor-pointer">
            <BiPlus className="text-3xl text-white"/>
        </Link>
    </div>
   )
}
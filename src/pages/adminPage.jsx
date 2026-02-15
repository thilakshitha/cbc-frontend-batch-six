import { Route, Routes,Link } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

export function AdminPage(){
    return(
        <div className="w-full h-screen flex ">
            <div className="w-[300px] h-full flex flex-col items-center">
                <span className="text-3xl font-bold my-5">admin panel</span>

                <Link  className="text-2xl flex flex-row h-[60px] w-full  items-center gap-[25px] p-[25px] border" to="/admin/products"><FaBoxArchive/> Products</Link>
                <Link  className="text-2xl flex flex-row h-[60px] w-full   items-center gap-[25px] p-[25px] border"to="/admin/orders"><FaShoppingBag />orders</Link>
                <Link  className="text-2xl flex flex-row h-[60px] w-full   items-center gap-[25px] p-[25px] border  border"to="/admin/products"><FaUserAlt />users</Link>
                
            </div>
            <div className="w-[calc(100%-300px)] h-full ">
                <Routes path="/">
                   <Route path="/" element={<h1>dashboard</h1>}/>
                   <Route path="/products" element={<h1>products</h1>}/>
                   <Route path="/orders" element={<h1>orders</h1>}/>
                   

                </Routes>
            </div>
        </div>
    )
}
import { Route, Routes } from "react-router-dom";

export function AdminPage(){
    return(
        <div className="w-full h-screen bg-red-700 flex">
            <div className="w-[300px] h-full bg-white">
            </div>
            <div className="w-[calc(100%-300px)] h-full bg-blue-800">
                <Routes path="/">
                   <Route path="/" element={<h1>dashboard</h1>}/>
                   <Route path="/products" element={<h1>products</h1>}/>
                   <Route path="/orders" element={<h1>orders</h1>}/>

                </Routes>
            </div>
        </div>
    )
}
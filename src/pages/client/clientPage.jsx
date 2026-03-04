import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";

import ProductsPage from "./productsPage";
import ProductOverViewPage from "./productOverView";

export default function ClientWebPage(){

    return(
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-100px)]">
              <Routes path="/">
                 <Route path="/" element={<h1 className="text-3xl text-center">welcome to the home page</h1>}/>
                 <Route path="/products" element={<ProductsPage/>}/>
                 <Route path="/reviews" element={<h1 className="text-3xl text-center">welcome to thereviews</h1>}/>
                 <Route path="/about-us" element={<h1 className="text-3xl text-center">welcome to the about us</h1>}/>
                 <Route path="/contact-us" element={<h1 className="text-3xl text-center">welcome to the contact us</h1>}/>
                 <Route path="/*" element={<h1 className="text-3xl text-center">404 not found</h1>}/>
                 <Route path="/overview/:productId" element={<ProductOverViewPage/>}/>


              </Routes>
            </div>
        </div>
    )
}
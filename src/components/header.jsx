import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Header(){

    return(
        <header className="h-[100px] bg-blue-500 flex justify-center items-center relative">
           <Link to="/" className="text-white text-xl font-bold">
                Home
           </Link>
            <Link to="/products" className="text-white text-xl font-bold ml-4">
                products
           </Link>
            <Link to="/reviews" className="text-white text-xl font-bold ml-4">
                reviews
           </Link>
           <Link to="/about-us" className="text-white text-xl font-bold ml-4">
                about us
           </Link>
           <Link to="/contact-us" className="text-white text-xl font-bold ml-4">
                contact us
           </Link>
           <Link to="/cart" className="absolute right-[80px]">
                <BiCart className="text-white text-3xl font-bold ml-4"/>
           </Link>
        </header>
    )
}
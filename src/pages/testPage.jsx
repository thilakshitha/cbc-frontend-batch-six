import { useState } from "react";

export default function TestPage(){
    const [count, setCount] = useState(0)

    function increment(){
       setCount(count+1)
    }

    function decrement(){
        setCount(count-1)
    }

    return(
        <div className="w-full h-screen bg-amber-500 flex justify-center items-center">
            <div className="w-[400px] h-[400px] bg-white flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold">{count}</h1>
                <div className="w-full flex justify-center items-center border h-[100px]">
                    <button onClick={decrement} className="w-[100px] bg-blue-600 h-[45px] flex justify-center items-center text-white rounded-full text-3xl mx-2">-</button>
                    <button onClick={increment} className="w-[100px] bg-blue-600 h-[45px] flex justify-center items-center text-white rounded-full text-3xl">+</button>

                </div>
            </div>

        </div>
    )
}
import { useState } from "react"

import toast from "react-hot-toast"
import uploadFile from "../utils/mediaUpload"





export default function TestPage(){
    const[file,setFile]=useState()

    function handleUpload(){
          uploadFile(file).then(
            (url)=>{
                console.log(url)
                toast.success("file uploaded successfully")

            }
          ).catch((error)=>{
            console.error("error uploading file",error)
            toast.error(error)

          })
    }
    
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <input type="file" onChange={
                (e)=>{
                    setFile(e.target.files[0])

                }
            } />
            <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded-2xl cursor-pointer">
                upload
            </button>
            

        </div>
    )
}
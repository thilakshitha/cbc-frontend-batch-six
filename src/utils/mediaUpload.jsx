const url = "https://stjbiyvmhrqggsryfxcq.supabase.co"

const key = "sb_publishable_8y37WINE7x7_MmnRDcj6bw_l7nQeQpd"

import { createClient } from "@supabase/supabase-js"
const supabase = createClient(url,key)

export default function uploadFile(file){
    const promise = new Promise(
       (resolve,reject)=>{
           if(file == null){
             reject("select file to upload");
             return
           }
           const timeStamp = new Date().getTime();
           const fileName = timeStamp + "-" + file.name

           supabase.storage.from("images").upload(fileName,file,{
            cacheControl:"3600",
            upsert:false
          }).then(
            ()=>{
              const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
              
              resolve(publicUrl)
            }
          ).catch(
            ()=>{
               
               reject("failed to upload the file")

            }
          )
        }
      )
    return promise;
}
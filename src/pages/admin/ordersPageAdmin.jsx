import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";

export default function OrdersPageAdmin(){
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)
    const [limit,setLimit] = useState(10)
    const [popupVisible,setPopupVisible] = useState(false)
    const [clickedOrder,setClickedorder] = useState(null)
    const [orderStatus,setOrderStatus] = useState("pending")
    const [orderNotes,setOrderNotes] = useState("")


    useEffect(()=>{
      

        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/"+page+"/"+limit,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
             .then((res)=>{
                setOrders(res.data.orders);
                setTotalPages(res.data.totalPages);
                setLoading(false)
                console.log(res.data)
             })
             .catch((err)=>{
                console.log(err)
             })
             
        }
    },[loading,page,limit]);

    return(
        <div className="w-full h-full flex flex-col ">
           <table className="w-full border-[3px]">
             <thead>
                <tr>
                    <th className="p-[10px]">orderId</th>
                    <th className="p-[10px]">email</th>
                    <th className="p-[10px]">name</th>
                    <th className="p-[10px]">Address</th>
                    <th className="p-[10px]">Phone</th>
                    <th className="p-[10px]">status</th>
                    <th className="p-[10px]">date</th>
                    <th className="p-[10px]">Total</th>
                    
                </tr>
             </thead>
             <tbody>
                {
                    orders.map((order,index)=>{
                        return(
                        <tr key={index} className="border-b-[1px] hover:bg-blue-500 hover:text-white" onClick={()=>{
                            setOrderStatus(order.status)
                            setOrderNotes(order.notes)
                            setClickedorder(order);
                            setPopupVisible(true);
                        }}>
                            <td className="p-[10px]">{order.orderID}</td>
                            <td className="p-[10px]">{order.email}</td>
                            <td className="p-[10px]">{order.name}</td>
                            <td className="p-[10px]">{order.address}</td>
                            <td className="p-[10px]">{order.phone}</td>
                            <td className="p-[10px]">{order.status}</td>
                            <td className="p-[10px]">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="p-[10px] text-end">{order.total.toFixed(2)}</td>
                        </tr>
                        )
                    })
                }
             </tbody>
         
           </table>

           {
  popupVisible && clickedOrder &&(
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center">
      
      <div className="w-[700px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 relative">
        {
          (orderStatus != clickedOrder.status || orderNotes!= clickedOrder.notes)&&
            <button className="absolute top-100 right-2 bg-blue-600 border-2 rounded-lg text-white p-2" onClick={async()=>{setPopupVisible(false);
                try{
                   await axios.put(
                    import.meta.env.VITE_BACKEND_URL + "/api/orders/" + clickedOrder.orderID,
                    {
                        status: orderStatus,
                        notes:orderNotes
                    },
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`,
                        }
                    }
                   );
                   toast.success("order updated successfuly")
                   setLoading(true)
                }catch(err){
                    console.error(err);
                    toast.error("failed to update the order");
                }
            }

            }>
            save changes
            </button>
            }

        {/* Close Button */}
        <button
          className="absolute w-[35px] h-[35px] right-[10px] top-[20px] bg-red-500 border-2 border-red-600 text-white top-[-15px] right-[-15px] rounded-full cursor-pointer hover:bg-white hover:text-red-600"
          onClick={() => setPopupVisible(false)}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Order Details
        </h2>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <p><span className="font-semibold">Order ID:</span> {clickedOrder.orderID}</p>
          <p><span className="font-semibold">Status:</span> 
            <span className="ml-2 px-2 py-1 rounded bg-yellow-100 text-yellow-700">
              {clickedOrder.status}

            </span>

            <select className="ml-4 p-1 border-rounded" value={orderStatus} onChange={(e)=> setOrderStatus(e.target.value)}>
                <option value="pending">pending</option>
                <option value="complete">complete</option>
                <option value="cancel">cancel</option>
                
            </select>
          </p>
          <p><span className="font-semibold">Name:</span> {clickedOrder.name}</p>
          <p><span className="font-semibold">Email:</span> {clickedOrder.email}</p>
          <p><span className="font-semibold">Phone:</span> {clickedOrder.phone}</p>
          <p><span className="font-semibold">Date:</span> 
            {new Date(clickedOrder.date).toLocaleString()}
          </p>
        </div>

        {/* Address */}
        <div className="mb-6">
          <p className="font-semibold">Address:</p>
          <p className="text-gray-600">{clickedOrder.address}</p>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <p className="font-semibold">Notes:</p>
          <p className="text-gray-600">{clickedOrder.notes}</p>
          <textarea className="w-full h-[100px]" 
          value={orderNotes}
          onChange={(e)=>setOrderNotes(e.target.value)}></textarea>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Items</h3>

          <div className="space-y-4">
            {clickedOrder.items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border p-3 rounded-lg">

                <img
                  src={item.image}
                  alt="product"
                  className="w-[70px] h-[70px] object-cover rounded-md"
                />

                <div className="flex-1">
                  <p className="font-medium">Product ID: {item.productId}</p>
                  <p className="text-sm text-gray-500">Price: Rs. {item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>

                <div className="font-semibold text-gray-700">
                  Rs. {item.price * item.qty}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-end text-xl font-bold text-green-600">
          Total: Rs. {clickedOrder.total}
        </div>

      </div>
    </div>
  )
}

           <Paginator currentPage={page}
                       totalPages={totalPages} 
                       setCurrentPage = {setPage} 
                       limit={limit} 
                       setLimit={setLimit}
                       setLoading={setLoading}/>
           
        </div>
    );
}
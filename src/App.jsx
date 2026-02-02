
import './App.css'
import ProductCard from './components/productCard'
import SuperProduct from './components/superProduct'

function App() {
  

  return (
    <>
      <div className='w-full h-screen bg-blue-300'>
        <div className='w-[600px] h-[600px] bg-black flex justify-center items-center'>
          <div className='w-[75px] h-[75px] bg-amber-950'></div>
          <div className='w-[75px] h-[75px] bg-amber-300'></div>
          <div className='w-[75px] h-[75px] bg-pink-50'></div>
          <div className='w-[75px] h-[75px] bg-purple-700'></div>
          <div className='w-[75px] h-[75px] bg-red-600'></div>
          <div className='w-[75px] h-[75px] bg-blue-900'></div>

        </div>
        
       
      </div>
      
    </>
  )
}

export default App

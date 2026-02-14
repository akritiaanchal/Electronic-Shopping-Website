import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { initialProducts } from '../data/Product'
import { Link } from 'react-router-dom'
import { ChevronLeft,Tag,Zap,ShoppingCart} from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const {id} = useParams();
  const [product, setProduct] = useState();

  useEffect(()=>{
    setProduct(initialProducts.find(data=>data.id == id))
  },[id]);
  if (!product) {
  return <h2 className="text-white text-center mt-20">Loading...</h2>;
  }
 
  const {addToCart} = useCart();

  return (
    <>
      <div className="container  mx-auto md:px-8 bg-gray-900 min-h-screen rounded-2xl shadow-2xl my-8 p-6 md:p-12 border border-gray-800">
        <Link to={'/'}>
        <button className='cursor-pointer flex items-center text-gray-400 hover:text-orange-400 transition duration-150 mb-12 font-semibold text-lg'>
           <ChevronLeft className='w-6 h-6 mr-1'/>
           <span>Back to All Products</span>
          </button>
          </Link>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-1'>
            <div className='w-full'>
              <img src={product?.image} alt={product?.name} 
              className='w-[400px] h-[400px] object-cover rounded-2xl shadow-gray-950/50 border-gray-800'
              />
              </div>
               <div className='flex flex-col justify-center'>
                <div>
                  <h1 className='text-4xl font-extrabold text-white mb-4 leading-tight tracking-tighter'>{product?.name}</h1>
                </div>
                <p className='text-3xl font-extrabold text-orange-400 mb-4'>{product?.price.toFixed(2)}</p>
                <h2 className='text-xl font-bold text-gray-200 mb-2 border-b border-orange-900/50 pb-2 flex items-center space-x-2'>
                  <Tag className='w-5 h-5 text-orange-500'/>
                  <span >Product Overview</span>
                </h2>

                <p className='text-gray-500 text-lg leading-relaxed mb-3'>{product?.description}</p>
                <ul className='space-y-3 text-gray-300 p-4 bg-gray-800 rounded-xl border border-gray-700'>
                  <li className='flex items-center space-x-3 text-lg'>
                     <Zap className='w-5 h-5 text-orange-500'/>
                     <span>High-quality, Professional Grade Materials</span>
                  </li>
                  <li className='flex items-center space-x-3 text-lg'>
                     <Zap className='w-5 h-5 text-orange-500'/>
                     <span>Comprehensive 1-Year Manufacture warranty</span>
                  </li>
                  <li className='flex items-center space-x-3 text-lg'>
                     <Zap className='w-5 h-5 text-orange-500'/>
                     <span>Immediate Shipping for In-Stock Items</span>
                  </li>
                </ul>

               <div className='mt-5 space-y-4 flex justify-center items-center flex-col'>
                <button 
                onClick={()=>addToCart(product)}
                className=' flex w-full py-3 bg-orange-600 text-white font-bold rounded-full shadow-lg shadow-orange-800/50  cursor-pointer hover:bg-orange-900/50 transition duration-300 flex items-center justify-center space-x-2 transform hover:ring-4 hover:ring-pink-600/50 upeercase tracking-wider'>
               <ShoppingCart className='w-5 h-5'/>
              <span>Add to Cart</span>
              </button>

              <Link to={'/'} 
                 className='w-full py-3 border-2 border-orange-600 text-orange-400 font-bold rounded-full cursor-pointer hover:bg-orange-900/50 transition duration-300  transform hover:ring-4 hover:ring-pink-600/50 upercase tracking-wider text-center'
              >
              Keep Shopping
              </Link>


               </div>
               </div>

            </div>

          </div>
    </>
  )
}

export default ProductDetail

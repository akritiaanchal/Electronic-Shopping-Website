import { createContext,useContext, useState,useMemo } from "react";

const CartContext = createContext();
import { initialProducts } from "../data/Product";

import React from "react";
import { ToastContainer, toast,Bounce } from 'react-toastify';

export const CartProvider = (props) => {
    const [cart,setCart] = useState([]);
    const products = initialProducts;

    // Add item into the cart
    const addToCart = (product) => {
        toast.success('Item added to cart', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        setCart((prevCart)=>{
            const existingItem = prevCart.find(item => item.id === product.id);
            if(existingItem){
                return prevCart.map((item) => item.id === product.id ? {...item, quantity:item.quantity + 1}:item);
            } else{
                return  [...prevCart, {...product,quantity:1}] 
            }

        });
    };

    //remove item from the cart
    const removeFromCart=(productId,removeAll=false)=>{
        toast.success('Item remove to cart', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        setCart((prevCart)=>{
            const existingItem = prevCart.find(item => item.id === productId);

            if(!existingItem) return prevCart;

            if(existingItem.quantity === 1 || removeAll){
                return prevCart.filter(item => item.id !== productId)
            } else{
                return prevCart.map(item => item.id === productId ? {...item,quantity: item.quantity-1}:item)
            }

        });
    }

   const cartCount = useMemo(() => 
  cart.reduce((total, item) => total + item.quantity, 0),
  [cart]
  );


    const cartTotal = useMemo(()=>cart.reduce((total,item)=>total+item.price*item.quantity,0),[cart]);

    const clearCart = () => setCart([]);

    console.log("my cart = ",cart)

    return (
        <CartContext.Provider value={{
            products,
            cart,
            addToCart,
            clearCart,
            cartTotal,
            cartCount,
            removeFromCart
            }}>
        {props.children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
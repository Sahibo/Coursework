'use client'
import { ReactNode, createContext, useContext } from "react";


type CartContextType = {

}

interface CartProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/ShoppingCart'

export const CartContext = createContext<CartContextType>({
});

export const useCart = () => {
    return useContext(CartContext)
}

export default function CartProvider({ children }: CartProviderProps) {

   

    const contextValue: CartContextType = {  }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}


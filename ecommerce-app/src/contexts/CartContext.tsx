'use client'
import { getUserId } from "@/functions/storage";
import { ShoppingCartItem } from "@/types/ShoppingCartItem";
import { ReactNode, createContext, useContext } from "react";


type CartContextType = {

    fetchGetAllItems: () => Promise<ShoppingCartItem[]>
    fetchAddItem: (subProductVarId: number) => Promise<void>
    fetchDeleteItem: (subProductVarId: number) => Promise<void>
    fetchIncreaseQuantity: (subProductVarId: number) => Promise<void>
    fetchDecreaseQuantity: (subProductVarId: number) => Promise<void>
}

interface CartProviderProps {
    children: ReactNode
}

const baseUrl1 = 'https://localhost:7041/ShoppingCart'

const baseUrl2 = 'https://localhost:7041/ShoppingCartItem'

export const CartContext = createContext<CartContextType>({
    fetchGetAllItems: async () => [],
    fetchAddItem: async (subProductVarId: number) => { },
    fetchDeleteItem: async (subProductVarId: number) => { },
    fetchIncreaseQuantity: async (subProductVarId: number) => { },
    fetchDecreaseQuantity: async (subProductVarId: number) => { }
});

export const useCart = () => {
    return useContext(CartContext)
}

export default function CartProvider({ children }: CartProviderProps) {


    const fetchGetAllItems = async () => {

        const userId = await getUserId()
        try {
            const url = `${baseUrl1}/GetAllItems/${userId}`
            const response = await fetch(url)
            const data = await response.json()
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }
    const fetchAddItem = async (subProductVarId: number) => {

        const userId = await getUserId()
        try {
            const url = `${baseUrl2}/AddToCart/${userId}/${subProductVarId}`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }
    const fetchDeleteItem = async (subProductVarId: number) => {
        const userId = await getUserId()
        try {
            const url = `${baseUrl2}/DeleteFromCart/${userId}/${subProductVarId}`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }
    const fetchIncreaseQuantity = async (subProductVarId: number) => {
        const userId = await getUserId()
        try {
            const url = `${baseUrl2}/Increase/${userId}/${subProductVarId}`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }
    const fetchDecreaseQuantity = async (subProductVarId: number) => {
        const userId = await getUserId()
        try {
            const url = `${baseUrl2}/Decrease/${userId}/${subProductVarId}`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const contextValue: CartContextType = { fetchGetAllItems, fetchAddItem, fetchDeleteItem, fetchIncreaseQuantity, fetchDecreaseQuantity }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}


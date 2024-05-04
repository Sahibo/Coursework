'use client'
import { getUserId } from "@/functions/storage";
import { Order } from "@/types/Order";
import { ReactNode, createContext, useContext } from "react";


type OrderContextType = {
    fetchOrder: () => Promise<Order>
    fetchAddOrder: () => Promise<void>
}

interface OrderProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/Order'

export const OrderContext = createContext<OrderContextType>({
    fetchOrder: async () => ({} as Order),
    fetchAddOrder: async () => { }


});

export const useOrderContext = () => {
    return useContext(OrderContext)
}

export default function OrderProvider({ children }: OrderProviderProps) {

    const fetchAddOrder = async () => {
        const userId = await getUserId()
        console.log(userId);

        try {
            const url = `${baseUrl}`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userId)
                }
            )
            const data = await response.text()
            console.log(data);

            // setProducts(data)
            // return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }

    }

    const fetchOrder = async () => {
        const userId = await getUserId()
        console.log(userId);

        try {
            const url = `${baseUrl}/${userId}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data);

            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }

    }
    const contextValue: OrderContextType = { fetchOrder, fetchAddOrder }
    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    )
}


'use client'
import { Product } from "@/types/Product";
import { Gender } from "next-auth/providers/kakao";
import { ReactNode, createContext, useContext, useState } from "react";


type ProductContextType = {
    products: Product[]
    fetchProductsByGender: (gender: number) => Promise<Product[]>

}

interface ProductProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/Product'

export const ProductContext = createContext<ProductContextType>({
    products: [],
    fetchProductsByGender: async (gender: number) => []


});

export const useProductContext = () => {
    return useContext(ProductContext)
}

export default function ProductProvider({ children }: ProductProviderProps) {

    const [products, setProducts] = useState<Product[]>([])
    const fetchProductsByGender = async (gender: number) => {
        try {
            const url = `${baseUrl}/Gender/${gender}`
            const response = await fetch(url)
            const data = await response.json()
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }


    const contextValue: ProductContextType = { products, fetchProductsByGender }
    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}


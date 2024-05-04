'use client'
import { Gender } from "@/types/Gender";
import { ParentCategory } from "@/types/ParentCategory";
import { ReactNode, createContext, useContext } from "react";


type CategoryContextType = {
    fetchParentCategoriesByGender: (gender: Gender) => Promise<ParentCategory[]>
}

interface CategoryProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/ParentCategory'

export const CategoryContext = createContext<CategoryContextType>({
    fetchParentCategoriesByGender: async () => []

});

export const useCategoryContext = () => {
    return useContext(CategoryContext)
}

export default function CategoryProvider({ children }: CategoryProviderProps) {

    const fetchParentCategoriesByGender = async (gender: Gender) => {
        try {
            const url = `${baseUrl}/Gender/${gender}`
            const response = await fetch(url)
            const data = await response.json()
            // setProducts(data)
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const contextValue: CategoryContextType = { fetchParentCategoriesByGender }
    return (
        <CategoryContext.Provider value={contextValue}>
            {children}
        </CategoryContext.Provider>
    )
}


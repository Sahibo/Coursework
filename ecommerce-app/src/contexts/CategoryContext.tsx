'use client'
import { ReactNode, createContext, useContext } from "react";


type CategoryContextType = {

}

interface CategoryProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/Category'

export const CategoryContext = createContext<CategoryContextType>({
});

export const useCategoryContext = () => {
    return useContext(CategoryContext)
}

export default function CategoryProvider({ children }: CategoryProviderProps) {

   

    const contextValue: CategoryContextType = {  }
    return (
        <CategoryContext.Provider value={contextValue}>
            {children}
        </CategoryContext.Provider>
    )
}


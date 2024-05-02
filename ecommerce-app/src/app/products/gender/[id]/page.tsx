'use client'

import { useProductContext } from "@/contexts/ProductContext"
import { Product } from "@/types/Product"
import { useEffect, useState } from "react"

interface Props {
    params: {
        id: string
    }
}

export default function ProductsByGender({ params }: Props) {
    const productContext = useProductContext()
    const [products, setProducts] = useState<Product[]>([])
    const { id } = params

    useEffect(() => {
        const fetchData = async () => {
            let gender = Number(id)
            let products = await productContext.fetchProductsByGender(gender)
            if (products) {

                setProducts(products)
            }
        }
        fetchData()
    }, [productContext, params.id])


    return (
        <div>
            {products.length > 0 ? products.map((product) =>
            (
                <div key={product.id}>
                    {product.name}
                </div>
            )) : <></>}
        </div>
    )
}
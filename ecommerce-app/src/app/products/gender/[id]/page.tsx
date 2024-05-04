'use client'

import Grid from "@/components/grid"
import GridCard from "@/components/gridCard"
import { useProductContext } from "@/contexts/ProductContext"
import { Product } from "@/types/Product"
import Link from "next/link"
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
    }, [productContext, id])


    return (
        <Grid>
        {products.map((product) =>
          product.productVariations.map((productVariation) => (
            <div key={productVariation.id}>
              <GridCard
                gridItem={{
                  id: productVariation.id,
                  name: product.name,
                  price: productVariation.subProductVariations[0].price,
                  imageData: productVariation.productImages[0].imageData,
                }}
              />
            </div>
          ))
        )}
      </Grid>
    )
}
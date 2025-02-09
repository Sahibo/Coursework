import { Color } from "./Color"

export type Product = 
{
    id: number,
    name: string,
    make: string,
    fabric: string,
    description: string,
    productVariations: ProductVariation[]

}

export type ProductVariation = {
    id: number,
    name: string,
    color: Color,
    product: Product
    productImages: ProductImage[],
    subProductVariations: SubProductVariation[]
}

export type ProductImage = 
{
    id: number, 
    imageData: string,
    
}

export type SubProductVariation = 
{
    id: number,
    size: string,
    price: number,
    totalPrice: number,
    quantity: number,
    discount: number,
    productVariation: ProductVariation
}
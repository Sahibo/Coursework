import { ParentCategory } from "./ParentCategory"
import { Product } from "./Product"

export type Category = 
{
    id: number,
    name: string,
    parentCategory: ParentCategory,
    products: Product[]
}
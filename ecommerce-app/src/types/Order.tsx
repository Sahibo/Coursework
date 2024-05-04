import { ShoppingCart } from "./ShoppingCart"

export type Order = 
{
    id: number,
    date: Date,
    totalQuantity: number,
    totalPrice: number,
    shoppingCart: ShoppingCart
}
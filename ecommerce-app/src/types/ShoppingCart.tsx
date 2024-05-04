import { ShoppingCartItem } from "./ShoppingCartItem"

export type ShoppingCart = 
{
    totalQuantity: number,
    totalPrice: number,
    shoppingCartItems: ShoppingCartItem[]
}
import { SubProductVariation } from "./Product"

export type ShoppingCartItem =
{
    quantity: number,
    totalPrice: number,
    subProductVariation: SubProductVariation
}
'use client'

import { useCart } from "@/contexts/CartContext"
import { useOrderContext } from "@/contexts/OrderContext"
import { getUserId } from "@/functions/storage"
import { Color } from "@/types/Color"
import { ShoppingCartItem } from "@/types/ShoppingCartItem"
import { useEffect, useState } from "react"

export default function Cart() {

    let [items, setItems] = useState<ShoppingCartItem[]>([])
    const orderContext = useOrderContext()
    const cartContext = useCart()

    useEffect(() => {
        const fetchData = async () => {
            let items = await cartContext.fetchGetAllItems()
            console.log(items);

            setItems(items)
        }
        fetchData()

    }, [cartContext])

    const handleIncrease = async (id: number) => {
        await cartContext.fetchIncreaseQuantity(id)
        let items = await cartContext.fetchGetAllItems()
        console.log(items);

        setItems(items)
    }


    const handleDecrease = async (id: number) => {
        await cartContext.fetchDecreaseQuantity(id)
        let items = await cartContext.fetchGetAllItems()
        console.log(items);

        setItems(items)

    }

    const handleAddOrder = async () => {
        await orderContext.fetchAddOrder()
        let items = await cartContext.fetchGetAllItems()
        console.log(items);

        setItems(items)
    }


    return (
        <div>
            {items && items.length > 0 ? (
                <div>
                    {items.map((item, index) =>
                    (
                        <div key={index}>
                            <h1>{item.totalPrice}</h1>
                            <h1>{item.quantity}</h1>
                            <h1>{item.subProductVariation.productVariation.product.name}</h1>
                            <h1>{Color[item.subProductVariation.productVariation.color]}</h1>
                            <h1>{item.subProductVariation.size}</h1>
                            <img style={{ width: 300, height: 300 }} src={`data:image/jpeg;base64,${item.subProductVariation.productVariation.productImages[0].imageData}`} alt={item.subProductVariation.productVariation.product.name} />

                            <button onClick={() => handleIncrease(item.subProductVariation.id)}>+</button>

                            <button onClick={() => handleDecrease(item.subProductVariation.id)}>-</button>
                            <button onClick={() => handleAddOrder()}>Place order</button>
                        </div>
                    ))}
                </div>
            ) : <></>}
        </div>
    )
}
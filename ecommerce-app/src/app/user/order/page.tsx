'use client'

import { useOrderContext } from "@/contexts/OrderContext"
import { Order } from "@/types/Order"
import { useEffect, useState } from "react"

export default function OrderDetails() {
    const orderContext = useOrderContext()
    const [order, setOrder] = useState<Order | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            let order = await orderContext.fetchOrder()
            if (order) {
                setOrder(order)
            }
        }
        fetchData()
    }, [orderContext])

    return (
        <div>
            {order && order.shoppingCart && order.shoppingCart.shoppingCartItems ? order.shoppingCart.shoppingCartItems.map((item, index) =>
            (
                <div key={index}>
                    <h1>{item.subProductVariation.productVariation.product.name}</h1>
                </div>
            )
            ) : <div>No items in the order</div>}


        </div>
    )
}
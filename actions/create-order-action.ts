"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data:unknown) {
    const result = OrderSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    const { name, total, order, tableId} = result.data;

    try {
        await prisma.order.create({
            data: {
                name,
                total,
                tableId,
                statusTable: true,
                orderProducts: {
                    create: order.map(product => ({
                        quantity: product.quantity,
                        productId: product.id,
                    })),
                }
            },
        })
    } catch (error) {
        console.error("Error creating order:", error)
        return {
            errors: [{ message: "Error creating order. Please try again later." }]
        }
    }
}
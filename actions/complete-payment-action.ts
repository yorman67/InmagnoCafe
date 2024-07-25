"use server"

import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export  async function createPayment(orderId: number) {
    
    try {

        await prisma.payment.create({
            data: {
                date: new Date(Date.now()),
                status: true,
                orderPayments: {
                    create: {
                        orderId
                    }
                }
            }
        })

        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                statusTable: false
            }
        })

        revalidatePath("/admin/orders/search")
    } catch (error) {
        console.error("Error completing order:", error)
    }   

}

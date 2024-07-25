"use client"

import { createPayment } from '@/actions/complete-payment-action';
import BilllOrder from "@/components/order/BilllOrder";
import { OrderWithProducts } from '@/src/types'
import { formatCurrency } from '@/src/util'
import { useRouter } from 'next/navigation';
import { useState } from 'react';


type OrderPaimentSummaryProps = {
    orders: OrderWithProducts[]
}
export default function OrderPaimentSummary({ orders }: OrderPaimentSummaryProps) {
    const [sendBill, setSendBill] = useState(false)

    const total = orders.map(order => order.total).reduce((total, order) => total + order, 0)

    const router = useRouter();

    const handlePayment = () => {
        orders.forEach(order => {
            createPayment(order.id)
        })
        router.push('/admin/orders')
    }

    const handleSendBiil = () => {
        setSendBill(true)
    }


    return (
        <>

            <h1 className="text-4xl text-center font-bold mt-10">  {formatCurrency(total)}</h1>
            <p className="text-center text-xl">Total a pagar</p>


            <div className="lg:w-2/3 mx-auto my-10 bg-white shadow p-5 space-y-5 rounded-lg">

                <div className="lg:flex lg:space-x-4 space-y-0 flex justify-center">
                    <button
                        onClick={handleSendBiil}
                        className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer rounded-lg"
                    >
                        Enviar Factura
                    </button>

                    <button
                        onClick={handlePayment}
                        className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer rounded-lg"
                    >
                        Finalizar Pago
                    </button>
                </div>
            </div>
            {
                sendBill && (
                    <BilllOrder
                        setSendBill={setSendBill}
                        orders={orders} />
                )
            }
        </>
    )
}



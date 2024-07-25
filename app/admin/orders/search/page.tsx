import LatestOrdenItem from "@/components/order/LatestOrdenItem"
import OrderPaimentSummary from "@/components/order/OrderPaimentSummary"
import GoBackButton from "@/components/ui/GoBackButton"
import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"


async function searchOrdersByTable(tableId: string) {
    const orders = await prisma.order.findMany({
        where: {
            AND: [
                {
                    orderReadyAt: {
                        not: null
                    }
                },
                { tableId: tableId },
                { statusTable: true }
            ]


        },
        orderBy: {
            orderReadyAt: 'desc'
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    return orders

}
export default async function SearchOrderPage({ searchParams }: { searchParams: { tableId: string } }) {


    revalidatePath(`/admin/orders/search?tableId=${searchParams.tableId}`)
    const tableId = searchParams.tableId
    const orders = await searchOrdersByTable(tableId)

    return (
        <>
            <GoBackButton />
            <h1 className="text-center mt-20 text-6xl font-black">Factura para la mesa {tableId}</h1>
        
            {
                orders.length ? (
                    <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
                        {orders.map(order => (
                            <LatestOrdenItem
                                key={order.id}
                                order={order}
                            />
                        ))}
                    </div>
                ) : <p className="text-center my-10">La mesa no tiene Ordenes</p>
            }

            <OrderPaimentSummary
                orders={orders}
            />
        </>

    )
}

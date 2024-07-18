"use client"
import { useStore } from "@/src/store"
import ProductDatail from "./ProductDatail"
import { formatCurrency } from "@/src/util"
import { useMemo } from "react"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

  const { order,clearOrder } = useStore()
  const total = useMemo(() => order.reduce((total, product) => total + product.subtotal, 0), [order])


  const  handleCriateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total: total,
      order: order
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(
        issue => toast.error(issue.message)
      )
      return
    }
    
    const response = await createOrder(data)
    if (response?.errors){
      response.errors.forEach(
        error => toast.error(error.message)
      )
    }

    toast.success('Orden creada')
    clearOrder()
  
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-bold">Mi pedido</h1>

      {
        order.length === 0 ? (
          <p className="text-center text-2xl">Agrega productos</p>
        ) : (
          <div className="mt-5">
            {
              order.map((product) => (
                <ProductDatail
                  key={product.id}
                  product={product}
                />
              ))
            }
            <p className="text-2xl mt-20 text-center text-gray-700">
              Total:{' '}
              <span className="font-bold  "> {formatCurrency(total)}</span>
            </p>

            <form
              className="w-full mt-10 space-y-5"
              action={handleCriateOrder}
            >

              <input
                className="w-full p-3 rounded bg-gray-100"
                type="text"
                placeholder="Ingresa tu nombre"
                name="name"
              />
              <input
                type="submit"
                className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold hover:bg-slate-700"
                value={"Confirmar pedido"}
              />
            </form>
          </div>
        )
      }
    </aside>
  )
}

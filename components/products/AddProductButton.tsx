"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"


type AddProductButtonProps = {
    product: Product
}
export default function AddProductButton({ product }: AddProductButtonProps) {

    const {addToOrder} = useStore()

    return (
        <button 
        className="mt-4 bg-indigo-600 hover:bg-indigo-800 text-white w-full py-3 uppercase font-bold cursor-pointer"
        type="button"
        onClick={() => addToOrder(product)}
        >
            Agregar al carrito
        </button>)
}

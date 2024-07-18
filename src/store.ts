import { create } from "zustand";
import { ordenItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: ordenItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product["id"]) => void
    descreaseQuantity: (id: Product["id"]) => void
    removeFromOrder: (id: Product["id"]) => void
    clearOrder: () => void
}

export const useStore = create<Store>()((set, get) => ({
    order: [],
    addToOrder: (product) => {

        let items: ordenItem[] = []

        if (get().order.find((item) => item.id === product.id)) {
            items = get().order.map((item) => {
                if (item.id === product.id) {
                    return {
                         ...item,
                         quantity: item.quantity + 1, 
                         subtotal: item.price * (item.quantity + 1) 
                        }
                } else {
                    return item
                }
            })
        } else {
            items = [...get().order, { 
                ...product,
                 quantity: 1, 
                 subtotal: product.price 
                }]
        }

        set(() => ({
            order: items
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: item.price * (item.quantity + 1)
                    }
                } else {
                    return item
                }
            })
        }))
    },
    descreaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                        subtotal: item.price * (item.quantity - 1)
                    }
                } else {
                    return item
                }
            })
        }))
    },
    removeFromOrder: (id) => {
        set((state) => ({
            order: state.order.filter((item) => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))
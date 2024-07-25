import { Order, OrderProduct, Product } from "@prisma/client";

export type ordenItem = Pick<Product, "id" | "name" | "price" | "image"> & {
    quantity: number
    subtotal: number
}

export type OrderWithProducts = Order & {
    orderProducts: (OrderProduct & {
         product: Product 
        })[]
}

export type OrderBill ={
    idBill: string
    fecha: string
    nameBusiness: string
    nit: string
    address: string
    nameClient: string
    emailClient: string
    idClient: string
    phoneClient: string
}


"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function AddProductForm({children}: {children: React.ReactNode}) {

    const router = useRouter()
    
    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image'),
        }

        const result = ProductSchema.safeParse(data)

        if (!result.success) {
            result.error.issues.forEach(
                issue => toast.error(issue.message)
            )
            return
        }
    
        const response =  await createProduct(data) // valido en servidor
        if (response?.errors) {
            response.errors.forEach(
                error => toast.error(error.message)
            )
        }

        toast.success('Producto creado')
        router.push('/admin/products')
    }

    return (

        // {children} asi puedo usar un componente de servicio en uno de clientes esto se llama ----> composicion parent
        <div className="bg-white mt-10 px-5 py-10 rounded-lg shadow-md max-w-3xl mx-auto">
            <form
                className="space-y-5"
                action={handleSubmit}
            >
                {children}  
                
                <input
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    type="submit"
                    value={'Agregar'} />

            </form>
        </div>
    )
}

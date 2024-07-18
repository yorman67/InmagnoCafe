"use client"

import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/src/schema"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function EditProductForm({children}: {children: React.ReactNode}) {

    const router = useRouter()
    const paramas = useParams()
    const {id} = paramas
    
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
    
        const response =  await updateProduct(data, +id) // valido en servidor
        if (response?.errors) {
            response.errors.forEach(
                error => toast.error(error.message)
            )
        }

        toast.success('Producto actualizado')
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
                    value={'Guardar Cambios'} />

            </form>
        </div>
    )
}

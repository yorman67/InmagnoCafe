"use client"
import { SearchSchema } from "@/src/schema"
import {  useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function ProductSearchForm() {


    const router = useRouter()

    const handleSearch = (formData : FormData) => {
        const data = {
            search: formData.get('search')
        }
       const result = SearchSchema.safeParse(data)
       if (!result.success) {
        result.error.issues.forEach(
          issue => toast.error(issue.message)
        )
        return
       }

       router.push(`/admin/products/search?search=${data.search}`) // cambiar de pagina cliente
       
    }

  return (
    <form
    action={handleSearch}
    className='flex items-center justify-center gap-2'
    >
        <input
        type="text"
        placeholder='Buscar Productos'
        name='search'
        className='w-full lg:w-1/2 border border-gray-300 rounded-md p-2'
        />

        <input
        type="submit"
        value="Buscar"
        className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer rounded-lg'
        />

    </form>
  )
}

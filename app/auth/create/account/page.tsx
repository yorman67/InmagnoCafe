"use client"
import { createAccount } from "@/actions/create-account-action"
import { RegisterSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"


export default function AccountPage() {

    const handleSubmit = async(formData: FormData) => {
        const data = {
            email: formData.get('email'),
            name: formData.get('name'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation')
        }

        const result = RegisterSchema.safeParse(data)
        
        if (!result.success) {
            result.error.issues.forEach(
                issue => toast.error(issue.message)
            )
            return
        }

        const response = await createAccount(data)

        if (response.errors) {
            response.errors.forEach(
                error => toast.error(error.message)
            )
        }

        if (!response.success) {
            toast.error(response.error)
            return
        }

        toast.success(response.message)
        redirect('/auth/login')
    }

 

    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
            </p>

            <form
                className="space-y-8 p-10  bg-white mt-10"
                action={handleSubmit}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        name="email"
                    />

                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full p-3  border-gray-300 border"
                        name="name"
                    />

                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        name="password"
                    />

                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        name="password_confirmation"
                    />


                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>


        </>
    )
}

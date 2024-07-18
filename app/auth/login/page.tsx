"use client"
import { loginUser } from "@/actions/login-user-action"
import { LoginSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

export default function LoginPage() {

    const  handleSubmit = async(formData: FormData) => {
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const result = LoginSchema.safeParse(data)

        if (!result.success) {
            result.error.issues.forEach(
                issue => toast.error(issue.message)
            )
            return
        }

        const response =  await loginUser(data)

        if (response?.errors) {
            response.errors.forEach(
                error => toast.error(error.message)
            )
        }

        if(!response.success) {
            toast.error(response.error)
        }

        if(response.token) {
            localStorage.setItem('token', response.token);
             toast.success('Iniciaste Sesion')
            redirect('/admin/products')
        }

       
        
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
            <p className="text-2xl font-light text-white mt-5">
                {''}
            </p>


            <form
                className="space-y-8 p-10 bg-white mt-10"
                action={handleSubmit}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
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
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        name="password"
                    />

                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>



        </>
    )


}

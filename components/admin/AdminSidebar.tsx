"use client"
import { useEffect, useState } from "react";
import Logo from "../ui/Logo"
import AdminRoute from "./AdminRoute"
import { authenticate } from "@/src/util/jwt";
import { redirect } from "next/navigation";

const adminNavigation = [
    { url: '/admin/orders', text: 'Ordenes', blank: false },
    { url: '/admin/products', text: 'Productos', blank: false },
    { url: '/orders/', text: 'Cocina', blank: false },
    { url: '/order/cafe', text: 'Ver Quiosco', blank: true },
]


export default async function AdminSidebar() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Solo se ejecuta en el cliente
        const token = localStorage.getItem('token');
        if (token) {
            authenticate(token).then(response => {
                setIsAuthenticated(response?.success || false);
            });
        }
        else{
            redirect('/auth/login')
        }
       
    }, []);

    if (!isAuthenticated) 
    return (
        <>
            <Logo />
            <div className="space-y-3 ">
                <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navegación</p>
                <nav className="flex flex-col">
                    {
                    adminNavigation.map(link => (
                        <AdminRoute
                            key={link.url}
                            link={link}
                        />
                    ))
                    }
                </nav>
            </div>
        </>

    )
}
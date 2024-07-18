import Logo from "@/components/ui/Logo";
import ToastNotification from "@/components/ui/ToastNotification";
import LoginPage from "./login/page";
import AccountPage from "./create/account/page";

export default async function AuthLayout({children,}: Readonly<{children: React.ReactNode;}>) {

    return (
        <>
         <div className="bg-gray-800 min-h-screen">
                
                <div className="py-10 lg:py-2 mx-auto w-[450px]">
                    <Logo />
                    {children}
                </div>
            </div>

            <ToastNotification />
        </>

        
    )
}
import OrderSidebar from "@/components/order/OrderSidebar";
import ClientWrapper from "@/components/order/ClientWrapper";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />
        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>
        <ClientWrapper />
      </div>
      <ToastNotification />
    </>
  );
}

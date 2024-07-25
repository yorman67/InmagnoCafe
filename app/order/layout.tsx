import ClientWrapper from "@/components/order/ClientWrapper";
import OrderSidebarClient from "@/components/order/OrderSideBarClient";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";
import { prisma } from '@/src/lib/prisma';

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <>
      <div className="md:flex">
        <OrderSidebarClient categories={categories} />
        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>
        <ClientWrapper />
      </div>
      <ToastNotification />
    </>
  );
}

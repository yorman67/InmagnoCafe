import ProductTable from "@/components/products/ProducstsTable";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
 
async function searchProducts(search: string) {
    return await prisma.product.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {

    const products = await searchProducts(searchParams.search)

    return (
        <>
            <Heading>Resultado de Busqueda : {searchParams.search}</Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end gap-2">
                <ProductSearchForm />
            </div>
            {
                products.length ? (
                    <ProductTable products={products} />
                ) : (
                    <p className="text-center">No se encontraron resultados</p>
                )
            }

        </>)
}

import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
}

export default async function OrderPage({ params }: { params: { category: string } }) {

  const products = await getProducts(params.category)

  return (
    <>
      <Heading>
        Selecciona los productos que te gustaria agregar a tu orden
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start ">
        {
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product} />
          ))
        }
      </div>

    </>
  )
}

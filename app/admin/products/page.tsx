import ProductTable from '@/components/products/ProducstsTable'
import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductsPaginations from '@/components/products/ProductsPaginations'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function productsCount() {
  const count = await prisma.product.count()
  return count
}
async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  const Products = await prisma.product.findMany(
    {
      take: pageSize,// es como un limit en sql
      skip: skip,
      include: {
        category: true
      }
    }
  )
  return Products
}

export type ProductsWithCategories = Awaited<ReturnType<typeof getProducts>>
export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {
  const page = +searchParams.page || 1
  const pageSize = 10

  if (page < 0) redirect('/admin/products')
  const productsData = getProducts(page, pageSize)
  const totalProductsData = productsCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData]) // inician las consultas al mismo tiempoz
  const totalPage = Math.ceil(totalProducts / pageSize)

  if (page > totalPage) redirect('/admin/products')


  return (
    <>
      <Heading> Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
        <Link
          href={'/admin/products/new'}
          className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
        >
          crear producto
        </Link>

        <ProductSearchForm />

      </div>

      <ProductTable
        products={products}
      />

      <ProductsPaginations
        page={page}
        totalPage={totalPage}
      />
    </>

  )
}

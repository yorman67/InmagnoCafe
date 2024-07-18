import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import React from 'react'

export default function notFound() {
    return (
        <div>
            <Heading>No se encontro el producto</Heading>
            <Link
                href={'/admin/products'}
                className='bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full mt-5'
            >
                volver
            </Link>
        </div>
    )
}

import Link from "next/link";

type Props = {
    page: number
    totalPage: number
}
export default function ProductsPaginations({ page, totalPage }: Props) {

    const pages = Array.from({ length: totalPage }, (_, i) => i + 1) // para crear ña paginacion con numeros

    return (
        <nav className="flex justify-center space-x-2 my-8">
            {page > 1 && (
                 <Link
                 className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                 href={`/admin/products?page=${page - 1}`}
             >&laquo;
             </Link>
            )}
            
            {
                pages.map(currentPage => (
                    <Link
                    key={currentPage}
                    className={`${page === currentPage ? 'bg-amber-400' : 'bg-white'}  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}   
                    href={`/admin/products?page=${currentPage}`}
                >
                    {currentPage}
                </Link>
                ))
            }
            
            {page < totalPage && (
                <Link
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    href={`/admin/products?page=${page + 1}`}
                >&raquo;
                </Link>
            )}
        </nav>
    )
}

import { OrderWithProducts } from '@/src/types'

type lastestOrdenItemProps = {
    order: OrderWithProducts
}
export default function LatestOrdenItem({ order }: lastestOrdenItemProps) {
    return (
        <div className='bg-white shadow p-5 space-y-5 rounded-lg'>
            <p className='text-2xl font-extrabold'>
                {order.name}
            </p>
            <ul
                className='divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'
                role='list'
            >
                {
                    order.orderProducts.map((product) => (
                        <li
                            key={product.id}
                            className='flex items-center justify-between py-3'
                        >

                            <p>
                                <span className='font-bold'>
                                    ({product.quantity})
                                </span> {' '}
                                {product.product.name}
                            </p>

                        </li>
                    ))}

            </ul>
        </div>
    )
}

import { formatCurrency, getImagePath } from "@/src/util"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {

    const imagePath = getImagePath(product.image)

    return (
        <div className="border bg-white">

               <Image
                width={300}
                height={300}
                src={imagePath}
                alt={product.name}
                quality={50}
                priority={false}
            />
     
            <div className="p-5">
                <h3 className="text-xl font-bold line-clamp-1">{product.name}</h3>
                <p className="mt-2 text-amber-500 text-lg">{formatCurrency(product.price)}</p>
                <AddProductButton 
                    product={product}
                />
            </div>
        </div>
    );
}



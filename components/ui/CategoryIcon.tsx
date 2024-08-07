"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
  onClick?: () => void; // Añadimos la función onClick opcional
};

export default function CategoryIcon({ category, onClick }: CategoryIconProps) {
  const params = useParams();

  return (
    <div
      className={`${
        params.category === category.slug ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
      onClick={onClick} // Añadimos el manejador de clics
    >
      <div className="w-16 h-16 relative">
        <Image src={`/icon_${category.slug}.svg`} alt={category.slug} fill />
      </div>
      <Link className="text-xl font-bold" href={`/order/${category.slug}`}>
        {category.name}
      </Link>
    </div>
  );
}

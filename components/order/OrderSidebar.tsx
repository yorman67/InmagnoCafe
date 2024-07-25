import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";
import { Category } from "@prisma/client";

interface OrderSidebarProps {
  categories: Category[];
  onClose?: () => void; // Añadimos la función onClose opcional
}

export default function OrderSidebar({ categories, onClose }: OrderSidebarProps) {
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon
            key={category.id}
            category={category}
            onClick={onClose} // Pasamos la función onClose a cada CategoryIcon
          />
        ))}
      </nav>
    </aside>
  );
}

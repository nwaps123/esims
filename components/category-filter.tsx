import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CategoryFilterProps {
  currentCategory: string
}

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const categories = [
    { value: "all", label: "All Products" },
    { value: "games", label: "Gaming" },
    { value: "business", label: "Business Apps" },
  ]

  return (
    <div className="flex gap-2 mb-8 flex-wrap">
      {categories.map((category) => (
        <Button key={category.value} variant={currentCategory === category.value ? "default" : "outline"} asChild>
          <Link href={`/?category=${category.value}`}>{category.label}</Link>
        </Button>
      ))}
    </div>
  )
}

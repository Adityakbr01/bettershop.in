import { Badge } from "@/components/ui/badge";

export function getStockBadge(stock: number) {
  if (stock === 0) {
    return <Badge className="bg-red-500">Out of Stock</Badge>;
  } else if (stock <= 5) {
    return <Badge className="bg-yellow-500">Low Stock</Badge>;
  } else {
    return <Badge className="bg-green-500">In Stock</Badge>;
  }
}
// /constants/products.ts

export interface Product {
  id: string
  name: string
  category: string
  price: number // dalam rupiah
  sold: number  // total unit terjual
  isActive: boolean
}

export const dummyProducts: Product[] = [
  {
    id: "P001",
    name: "Buku Bergambar: Hewan Laut",
    category: "Buku Bergambar",
    price: 45000,
    sold: 120,
    isActive: true,
  },
  {
    id: "P002",
    name: "Worksheet Calistung Level 1",
    category: "Worksheet",
    price: 30000,
    sold: 95,
    isActive: true,
  },
  {
    id: "P003",
    name: "Flashcard Huruf Hijaiyah",
    category: "Flashcard",
    price: 25000,
    sold: 150,
    isActive: true,
  },
  {
    id: "P004",
    name: "Buku Bergambar: Profesi",
    category: "Buku Bergambar",
    price: 45000,
    sold: 60,
    isActive: false,
  },
  {
    id: "P005",
    name: "Worksheet Matematika Dasar",
    category: "Worksheet",
    price: 35000,
    sold: 80,
    isActive: true,
  },
]

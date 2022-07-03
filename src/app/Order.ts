import { Product } from "./Product";

export interface Order {
    id: number,
    orderDate: Date,
    totalPrice: number,
    products: Product,
    fullName: string,
    address: string
  }
  
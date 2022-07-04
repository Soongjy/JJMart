import { Product } from "./Product";

export interface Order {
    orderDate: Date,
    totalPrice: number,
    products: Product[],
    name: string,
    address: string
  }
  
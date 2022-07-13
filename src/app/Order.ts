import { Product } from "./Product";

export interface Order {
    id?:number,
    orderDate: Date,
    totalPrice: number,
    products: Product[],
    name: string,
    address: string,
    status:string
  }
  
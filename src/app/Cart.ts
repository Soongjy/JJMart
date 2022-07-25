import { Product } from "./Product";

export interface Cart {
    username:string,
    products: Product[],
    id?:number
 }
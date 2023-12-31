import { Product } from "./product";

export interface OrderItems {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  item_quentity: number;
  item_price: number;
  product_id: string;
  order_id: string;
}

export interface Order {
  _id: string;
  order_delivery_cost: number;
  order_status: string;
  mb_id: string;
  order_total_amount: number;
  createdAt: Date;
  updatedAt: Date;
  // from agrigations
  order_items: OrderItems[];
  product_data: Product[];
}

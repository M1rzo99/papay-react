export interface serchObj {
  page: number;
  limit: number;
  order: string;
}
export interface ProductSerchObj {
  page: number;
  limit: number;
  order: string;
  restaurant_mb_id?: string;
  product_collection?: string;
}

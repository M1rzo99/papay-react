import { Restaurant } from "./user";
import { Product } from "./product";
import { boArticle } from "./boArticles";
import { Order } from "./order";

// REACT APP STATE
export interface AppRootState {
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
}
// HOMEPAGE
export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: boArticle[];
  trendBoArticles: boArticle[];
  newsBoArticles: boArticle[];
}

// RESTAURANY PAGE
export interface RestaurantPageState {
  targetRestaurants: Restaurant[];
  randomRestaurants: Restaurant[];
  chosenRestaurant: Restaurant | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}

/*OREDRS PAGE */

export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

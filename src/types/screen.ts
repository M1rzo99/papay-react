import { Restaurant } from "./user";
import { Product } from "./product";
import { boArticle } from "./boArticles";

export interface AppRooState {
  homePage: HomePageState;
}
export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  besBoArticles: boArticle[];
  trendBoArticles: boArticle[];
  newsBoArticles: boArticle[];
}

import { Restaurant } from "./user";
import { Product } from "./product";
import { boArticle } from "./boArticles";

export interface AppRootState {
  homePage: HomePageState;
}
export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: boArticle[];
  trendBoArticles: boArticle[];
  newsBoArticles: boArticle[];
}

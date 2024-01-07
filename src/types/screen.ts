import { Member, Restaurant } from "./user";
import { Product } from "./product";
import { BoArticle } from "./boArticles";
import { Order } from "./order";
import { Follower, Following } from "./follow";

// REACT APP STATE
export interface AppRootState {
  ordersPage: OrdersPageState;
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
}
// HOMEPAGE
export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
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

// COmmunity page
export interface CommunityPageState {
  targetBoArticles: BoArticle[];
}
// MemberPage
export interface MemberPageState {
  chosenMember: any;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}

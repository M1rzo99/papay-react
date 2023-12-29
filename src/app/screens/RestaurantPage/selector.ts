// Malumot o'quvchi
import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectrestaurantPage = (state: AppRootState) => state.restaurantPage;

export const retriveTargetRestaurants = createSelector(
  selectrestaurantPage,
  (RestaurantPage) => RestaurantPage.targetRestaurants
);

export const retriveRandomRestaurants = createSelector(
  selectrestaurantPage,
  (RestaurantPage) => RestaurantPage.randomRestaurants
);

export const retriveChosenRestaurants = createSelector(
  selectrestaurantPage,
  (RestaurantPage) => RestaurantPage.chosenRestaurant
);

export const retriveTargetProducts = createSelector(
  selectrestaurantPage,
  (RestaurantPage) => RestaurantPage.targetProducts
);

export const retriveChosenDish = createSelector(
  selectrestaurantPage,
  (RestaurantPage) => RestaurantPage.chosenProduct
);

import { IRestaurant } from "./interface.ts";
//export const getResturant = (): Promise<IRestaurant> => {
export const getResturantServive = () => {
  return fetch(
    "https://random-data-api.com/api/restaurant/random_restaurant?size=100"
  );
};

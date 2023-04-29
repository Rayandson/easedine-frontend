import { RestaurantBody } from "../types";
import api from "./api"

async function postRestaurant(body: RestaurantBody) {
    const restaurant = await api.post("/restaurants", body);

    return restaurant;
}

async function getRestaurants() {
    const restaurants = await api.get("/restaurants");

    return restaurants;
}

async function getRestaurantInfo(profileName: string) {
    const restaurants = await api.get(`/restaurants/${profileName}`);

    return restaurants;
}

const restaurantsApi = {
    getRestaurants,
    getRestaurantInfo,
    postRestaurant
}

export default restaurantsApi
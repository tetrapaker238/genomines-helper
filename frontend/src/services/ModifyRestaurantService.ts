import Restaurant from "../interfaces/Restaurant";
import axios from "axios";

export async function editRestaurant(restaurant: Restaurant) {
  const newRestaurant: Partial<Restaurant> = { ...restaurant };
  const restaurantId: number = restaurant.id;
  if (newRestaurant.rating === null) {
    delete newRestaurant.rating;
  }
  console.log(newRestaurant);

  await axios
    .put(`http://127.0.0.1:8000/restaurants/${restaurantId}/`, newRestaurant, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function deleteRestaurant(restaurantId: number) {
  await axios
    .delete(`http://127.0.0.1:8000/restaurants/${restaurantId}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function saveRestaurant(restaurant: Restaurant) {
  console.log(restaurant);
  const newRestaurant: Partial<Restaurant> = { ...restaurant };
  delete newRestaurant.id;

  if (newRestaurant.rating === "") {
    delete newRestaurant.rating;
  }

  console.log(newRestaurant);

  await axios
    .post("http://127.0.0.1:8000/restaurants/", newRestaurant, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.status === 201;
    })
    .catch((error) => {
      console.error(error);
    });
}

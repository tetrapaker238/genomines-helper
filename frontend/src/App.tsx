import RestaurantTable from "./components/RestaurantTable";
import { AddRow } from "./components/RestaurantForm";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import Restaurant from "./interfaces/Restaurant";
import FoodFilter from "./components/FoodFilter";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import CountryFilter from "./components/CountryFilter";

function ModifiableRestaurantTable({
  fetchRestaurants,
  restaurants,
  countryFilterText,
  setCountryFilterText,
}: {
  fetchRestaurants: () => void;
  restaurants: Array<Restaurant>;
  countryFilterText: string;
  setCountryFilterText: (country: string) => void;
}) {
  console.log(restaurants);
  const [foodFilterText, setFoodFilterText] = useState("");

  return (
    <>
      <div>
        <p>Los mejores</p>
        <h1>Restaurantes del mundo</h1>
      </div>

      <div>
        <Row>
          <Col>
            <FoodFilter
              filterText={foodFilterText}
              onFilterTextChange={setFoodFilterText}
            />
          </Col>

          <Col>
            <CountryFilter
              filterText={countryFilterText}
              onFilterTextChange={setCountryFilterText}
              fetchRestaurants={fetchRestaurants}
            />
          </Col>
          <Col className="align-content-center">
            <AddRow fetchRestaurants={fetchRestaurants} />
          </Col>
        </Row>
        <RestaurantTable
          filterText={foodFilterText}
          restaurants={restaurants}
          fetchRestaurants={fetchRestaurants}
        />
      </div>
    </>
  );
}

async function fetchRestaurants(
  setCleanRestaurants: (restaurant: Restaurant[]) => void,
  country: string,
) {
  axios
    .get("http://127.0.0.1:8000/restaurants/", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        country: country,
      },
    })
    .then((response) => {
      const cleanRestaurants: Array<Restaurant> = [];
      const restaurantList: [] = response.data;
      console.log(response.data);
      restaurantList.forEach((rawRestaurant: any) => {
        const restaurant: Restaurant = {
          id: rawRestaurant.id,
          name: rawRestaurant.name,
          country: rawRestaurant.country,
          city: rawRestaurant.city,
          food: rawRestaurant.food,
          rating: rawRestaurant.rating === null ? "" : rawRestaurant.rating,
          visited: rawRestaurant.visited,
        };
        cleanRestaurants.push(restaurant);
      });
      setCleanRestaurants(cleanRestaurants);
    })
    .catch((error) => {
      console.error(error);
    });
}

function App() {
  const [restaurants, setCleanRestaurants] = useState<Array<Restaurant>>([]);
  const [countryFilterText, setCountryFilterText] = useState("");
  useEffect(() => {
    fetchRestaurants(setCleanRestaurants, countryFilterText);
  }, []);

  return (
    <>
      <ModifiableRestaurantTable
        fetchRestaurants={() => {
          fetchRestaurants(setCleanRestaurants, countryFilterText);
        }}
        restaurants={restaurants}
        countryFilterText={countryFilterText}
        setCountryFilterText={setCountryFilterText}
      />
    </>
  );
}

export default App;

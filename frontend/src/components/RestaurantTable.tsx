import { Dispatch, ReactElement, useState } from "react";
import Restaurant from "../interfaces/Restaurant";
import { EditRow } from "./RestaurantForm";
import { Table } from "react-bootstrap";
import { deleteRestaurant } from "../services/ModifyRestaurantService";

enum Order {
  ASC = 0,
  DOWN = 1,
}

function RestaurantRow({
  fetchRestaurants,
  restaurant,
}: {
  fetchRestaurants: () => void;
  restaurant: Restaurant;
}) {
  const visitedText: string = restaurant.visited ? "Sí" : "No";
  return (
    <tr>
      <td>{restaurant.name}</td>
      <td>{restaurant.country}</td>
      <td>{restaurant.city}</td>
      <td>{restaurant.food}</td>
      <td>{restaurant.rating}</td>
      <td>{visitedText}</td>
      <td>
        {" "}
        <EditRow
          fetchRestaurants={fetchRestaurants}
          restaurant={restaurant}
        />{" "}
      </td>
      <td>
        {" "}
        <i
          onClick={async () => {
            await deleteRestaurant(restaurant.id);
            await fetchRestaurants();
          }}
          className="bi bi-trash3-fill pointer-cursor"
        ></i>{" "}
      </td>
    </tr>
  );
}

interface ColumnOrder {
  selectedColumn: keyof Restaurant;
  order: number;
}

function Caret({
  sortableProperty,
  columnOrder,
  onColumnOrderChange,
}: {
  sortableProperty: keyof Restaurant;
  columnOrder: ColumnOrder;
  onColumnOrderChange: Dispatch<ColumnOrder>;
}) {
  const activated = columnOrder.selectedColumn === sortableProperty;
  return (
    <>
      {activated && (
        <i
          onClick={() => {
            onColumnOrderChange({
              ...columnOrder,
              order: columnOrder.order === Order.ASC ? Order.DOWN : Order.ASC,
            });
          }}
          className={
            "bi bi-caret-" +
            (columnOrder.order === Order.ASC ? "up" : "down") +
            "-fill pointer-cursor"
          }
        />
      )}
    </>
  );
}

function sortRestaurants(
  columnToSort: keyof Restaurant,
  restaurants: Array<Restaurant>,
  sortOrder: Order,
) {
  restaurants.sort((a: Restaurant, b: Restaurant) => {
    const aValue = a[columnToSort] !== null ? a[columnToSort]!! : 0;
    const bValue = b[columnToSort] !== null ? b[columnToSort]!! : 1;
    if (sortOrder === Order.ASC) {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

export default function RestaurantTable({
  filterText,
  restaurants,
  fetchRestaurants,
}: {
  filterText: string;
  restaurants: Array<Restaurant>;
  fetchRestaurants: () => void;
}) {
  const restaurantRows: Array<ReactElement> = [];
  const restaurantHeaders: Array<ReactElement> = [];
  const HEADERS: Array<{
    header: string;
    sortableProperty: keyof Restaurant | "";
  }> = [
    { header: "Nombre", sortableProperty: "name" },
    { header: "País", sortableProperty: "country" },
    { header: "Ciudad", sortableProperty: "city" },
    { header: "Comida ofrecida", sortableProperty: "food" },
    { header: "Calificación", sortableProperty: "rating" },
    { header: "Visitado", sortableProperty: "visited" },
    { header: "Editar", sortableProperty: "" },
    { header: "Eliminar", sortableProperty: "" },
  ];
  const [columnOrder, setColumnOrder] = useState<ColumnOrder>({
    selectedColumn: "name",
    order: Order.ASC,
  });

  sortRestaurants(columnOrder.selectedColumn, restaurants, columnOrder.order);

  restaurants.forEach((restaurant: Restaurant) => {
    if (
      restaurant.food.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
    ) {
      restaurantRows.push(
        <RestaurantRow
          fetchRestaurants={fetchRestaurants}
          restaurant={restaurant}
          key={restaurant.id}
        />,
      );
    }
  });

  HEADERS.forEach(
    (headerObj: {
      header: string;
      sortableProperty: keyof Restaurant | "";
    }) => {
      if (headerObj.sortableProperty !== "") {
        const restaurantProp: keyof Restaurant = headerObj.sortableProperty; //se revisó que no es ""
        restaurantHeaders.push(
          <th
            key={headerObj.header}
            onClick={() => {
              if (columnOrder.selectedColumn !== restaurantProp) {
                setColumnOrder({
                  selectedColumn: restaurantProp,
                  order: Order.ASC,
                });
              }
            }}
          >
            <Caret
              sortableProperty={restaurantProp}
              columnOrder={columnOrder}
              onColumnOrderChange={setColumnOrder}
            />{" "}
            {headerObj.header}
          </th>,
        );
      } else {
        restaurantHeaders.push(
          <th key={headerObj.header}>{headerObj.header}</th>,
        );
      }
    },
  );

  return (
    <Table responsive="true" striped="true">
      <thead>
        <tr>{restaurantHeaders}</tr>
      </thead>
      <tbody>{restaurantRows}</tbody>
    </Table>
  );
}

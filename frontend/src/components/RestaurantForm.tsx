import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Restaurant from "../interfaces/Restaurant";
import {
  saveRestaurant,
  editRestaurant,
} from "../services/ModifyRestaurantService";

function RowModal(
  DisplayButton: JSX.ElementType,
  fetchRestaurants: () => void,
  restaurant?: Restaurant,
) {
  const [show, setShow] = useState(false); // https://react-bootstrap.netlify.app/docs/components/modal
  const defaultRestaurant: Restaurant = {
    id: -1,
    name: "",
    country: "",
    city: "",
    food: "",
    visited: false,
    rating: "",
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    restaurant != undefined ? reset(restaurant) : reset(defaultRestaurant);
    setShow(true);
  };
  const { handleSubmit, register, reset, watch } = useForm({
    // https://react-hook-form.com/get-started#Quickstart
    defaultValues: restaurant != undefined ? restaurant : defaultRestaurant,
  });

  const visited: boolean = watch("visited");

  // https://react-bootstrap.netlify.app/docs/forms/form-text

  return (
    <>
      <DisplayButton onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Datos restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(async (data) => {
              console.log(data);
              data.id === -1
                ? await saveRestaurant(data)
                : await editRestaurant(data);
              await fetchRestaurants();
              handleClose();
            })}
          >
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Nombre restaurant</Form.Label>
              <Form.Control {...register("name")} type="text" id="name" minLength={2} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="location">País</Form.Label>
              <Form.Control
                {...register("country")}
                type="text"
                id="location"
                minLength={2}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="location">Ciudad</Form.Label>
              <Form.Control {...register("city")} type="text" id="location" minLength={2} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="food">Comida ofrecida</Form.Label>
              <Form.Control {...register("food")} type="text" id="food" minLength={2} />
            </Form.Group>

            <div className="mb-3">
              <Form.Check
                type="checkbox"
                id="visited"
                label="Lugar visitado"
                {...register("visited")}
              />
            </div>
            {visited && (
              <div>
                <Form.Label htmlFor="rating">
                  Calificación del 1 al 10
                </Form.Label>
                <Form.Control
                  {...register("rating")}
                  type="number"
                  id="rating"
                  max={10}
                  min={1}
                />
              </div>
            )}
            <Button variant="primary" type="submit">
              Guardar fila
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <i onClick={onClick} className="bi bi-pencil-square pointer-cursor"></i>
  );
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="primary">
      {" "}
      Agregar restaurant{" "}
    </Button>
  );
}

export function AddRow({ fetchRestaurants }: { fetchRestaurants: () => void }) {
  return RowModal(AddButton, fetchRestaurants);
}

export function EditRow({
  fetchRestaurants,
  restaurant,
}: {
  fetchRestaurants: () => void;
  restaurant: Restaurant;
}) {
  return RowModal(EditButton, fetchRestaurants, restaurant);
}

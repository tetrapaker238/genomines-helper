import { Dispatch } from "react";
import { Form } from "react-bootstrap";

export default function FoodFilter({
  filterText,
  onFilterTextChange,
}: {
  filterText: string;
  onFilterTextChange: Dispatch<string>;
}) {
  return (
    <>
      <Form.Group className="mb-3" controlId="foodFilter">
        <Form.Label>Filtro comida ofrecida</Form.Label>
        <Form.Control
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
          type="text"
          placeholder="Buscar comida..."
        />
      </Form.Group>
    </>
  );
}

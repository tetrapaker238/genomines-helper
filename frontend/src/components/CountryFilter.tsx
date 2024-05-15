import { Dispatch } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

export default function CountryFilter({
  filterText,
  onFilterTextChange,
  fetchRestaurants
}: {
  filterText: string;
  onFilterTextChange: Dispatch<string>;
  fetchRestaurants: () => void;
}) {
  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId="countryFilter">
        <Col>
          <Form.Label className="align-self-start">Filtro país</Form.Label>
          <InputGroup>
            <Form.Control
              value={filterText}
              onChange={(e) => onFilterTextChange(e.target.value)}
              type="text"
              placeholder="Buscar país..."
            />
            <Button onClick={() => fetchRestaurants()}>
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Col>
      </Form.Group>
    </>
  );
}

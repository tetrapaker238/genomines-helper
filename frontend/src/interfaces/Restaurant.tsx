export default interface Restaurant {
  id: number;
  name: string;
  country: string;
  city: string;
  food: string;
  rating: number | "";
  visited: boolean;
}

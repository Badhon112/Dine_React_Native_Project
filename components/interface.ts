export interface Restaurant {
  name: string;
  seats: number;
  image: string;
  address: string;
  opening: string; // You can also use Date or a custom time format type if needed
  closing: string;
}

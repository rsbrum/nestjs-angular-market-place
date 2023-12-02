import { Car } from "./car.interface";
import { User } from "./user.interface";

export interface Bid {
  car: Car;
  user: User;
  price: number;
  createdAt: number;
}

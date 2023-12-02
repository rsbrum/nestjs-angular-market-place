import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Car } from "../interfaces/car.interface";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";
import { ConsoleService } from "./console.service";
import { MESSAGES } from "../consts/messages.enum";
import { API_ROUTES } from "../consts/routes.enum";
import { CreateCarDTO } from "shared/dtos/create-car.dto";

@Injectable({
  providedIn: "root",
})
export class CarsService {
  listedCars = new BehaviorSubject<Car[]>([]);

  constructor(
    private httpClient: HttpClient,
    private consoleService: ConsoleService
  ) {}

  fetchListedCars(message: string) {
    return this.httpClient
      .get<Car[]>(`${environment.api}${API_ROUTES.CAR_FETCH}`)
      .pipe(
        tap((cars) => {
          this.listedCars.next(cars);
          this.consoleService.emitMessage(message);
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  getListedCars(): Observable<Car[]> {
    this.fetchListedCars(MESSAGES.CARS_RETRIEVED);
    return this.listedCars.asObservable();
  }

  updateListedCars() {
    this.fetchListedCars(MESSAGES.CARS_UPDATED);
  }

  createCar(car: CreateCarDTO) {
    return this.httpClient.post(
      `${environment.api}${API_ROUTES.CAR_CREATE}`,
      car
    );
  }
}

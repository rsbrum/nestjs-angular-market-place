import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Car } from "src/app/interfaces/car.interface";
import { CarsService } from "src/app/services/cars.service";

@Component({
  selector: "app-right-panel",
  templateUrl: "./right-panel.component.html",
  styleUrls: ["./right-panel.component.scss"],
})
export class RightPanelComponent implements OnInit {
  listedCars: Observable<Car[]> | undefined;

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.listedCars = this.carsService.getListedCars();
  }
}

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MESSAGES } from "src/app/consts/messages.enum";
import { Car } from "src/app/interfaces/car.interface";
import { CarsService } from "src/app/services/cars.service";
import { ConsoleService } from "src/app/services/console.service";

@Component({
  selector: "app-new-car-dialog",
  templateUrl: "./new-car-dialog.component.html",
  styleUrls: ["./new-car-dialog.component.scss"],
})
export class NewCarDialogComponent implements OnInit {
  carForm = new FormGroup({
    name: new FormControl("", Validators.required),
    imageUrl: new FormControl("", Validators.required),
    startingPrice: new FormControl(0, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<NewCarDialogComponent>,
    private carsService: CarsService,
    private consoleService: ConsoleService
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  // @TODO Add better form validation
  onSubmit() {
    if (!this.carForm.valid) return;
    const { name, imageUrl, startingPrice } = this.carForm.value;

    const car: Car = {
      name: name || "",
      imageUrl: imageUrl || "",
      startingPrice: startingPrice || 0,
    };

    this.carsService.createCar(car).subscribe(() => {
      this.consoleService.emitMessage(MESSAGES.CARS_CREATED);
      this.carsService.updateListedCars();
      this.close();
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { Car } from "src/app/interfaces/car.interface";
import { AuthService } from "src/app/services/auth.service";
import { BidsService } from "src/app/services/bids.service";
import { CarsService } from "src/app/services/cars.service";
import { User } from "src/app/interfaces/user.interface";
import { MESSAGES } from "src/app/consts/messages.enum";
import { ConsoleService } from "src/app/services/console.service";

@Component({
  selector: "app-new-bid-dialog",
  templateUrl: "./new-bid-dialog.component.html",
  styleUrls: ["./new-bid-dialog.component.scss"],
})
export class NewBidDialogComponent implements OnInit {
  bidForm = new FormGroup({
    car: new FormControl({} as Car, Validators.required),
    price: new FormControl(0, Validators.required),
  });
  cars: Observable<Car[]> | undefined;
  selectedCar: Car | undefined;

  constructor(
    public dialogRef: MatDialogRef<NewBidDialogComponent>,
    private bidsService: BidsService,
    private carsService: CarsService,
    private authService: AuthService,
    private consoleService: ConsoleService
  ) {}

  ngOnInit(): void {
    this.cars = this.carsService.getListedCars();
  }

  close() {
    this.dialogRef.close();
  }

  onCarSelect(car: Car) {
    this.selectedCar = car;
    this.bidForm?.get("price")?.setValue(this.selectedCar?.startingPrice);
  }

  selectObjectComparison(option: Car, value: Car) {
    return option.id === value.id;
  }

  // @TODO add better form valiidation
  onSubmit() {
    if (!this.bidForm.valid) return;

    const user: User = this.authService.getUser();
    const newBid = {
      price: this.bidForm.get("price")?.value || 0,
      carId: this.bidForm.get("car")?.value?.id || 0,
      userId: user.id,
    };

    this.bidsService.createBid(newBid).subscribe(() => {
      this.consoleService.emitMessage(MESSAGES.BIDS_CREATED);
      this.close();
    });
  }
}

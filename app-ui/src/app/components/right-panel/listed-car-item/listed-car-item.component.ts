import { Component, Input, OnInit } from "@angular/core";
import { Car } from "src/app/interfaces/car.interface";

@Component({
  selector: "app-listed-car-item",
  templateUrl: "./listed-car-item.component.html",
  styleUrls: ["./listed-car-item.component.scss"],
})
export class ListedCarItemComponent implements OnInit {
  @Input() car: Car | undefined;

  constructor() {}

  ngOnInit(): void {}
}

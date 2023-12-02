import { Component, Input, OnInit } from "@angular/core";
import { Bid } from "src/app/interfaces/bid.interface";

@Component({
  selector: "app-bid-item",
  templateUrl: "./bid-item.component.html",
  styleUrls: ["./bid-item.component.scss"],
})
export class BidItemComponent implements OnInit {
  @Input() bid: Bid | undefined;
  constructor() {}

  ngOnInit(): void {}
}

import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Bid } from "src/app/interfaces/bid.interface";
import { BidsService } from "src/app/services/bids.service";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
})
export class CanvasComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport:
    | CdkVirtualScrollViewport
    | undefined;
  bids: Observable<Bid[]> | undefined;
  bidsSubscription: Subscription | undefined;

  constructor(private bidsService: BidsService) {}

  ngOnInit(): void {
    this.bidsService.listenToBids().subscribe();
    this.bids = this.bidsService.getNewBids();
    this.bidsSubscription = this.bids.subscribe(() => {
      this.viewport?.scrollTo({ bottom: 0, behavior: "smooth" });
    });
  }

  ngOnDestroy(): void {
    this.bidsSubscription?.unsubscribe();
  }
}

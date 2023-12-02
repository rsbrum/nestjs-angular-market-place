import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { ConsoleService } from "./console.service";
import { Bid } from "../interfaces/bid.interface";
import { CarsService } from "./cars.service";
import { CreateBidDTO } from "shared/dtos/create-bid.dto";
import { API_ROUTES } from "../consts/routes.enum";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MESSAGES } from "../consts/messages.enum";

@Injectable({
  providedIn: "root",
})
export class BidsService {
  private bids = new BehaviorSubject<any[]>([]);

  constructor(
    private socket: Socket,
    private consoleService: ConsoleService,
    private carsService: CarsService,
    private httpClient: HttpClient
  ) {}

  listenToBids() {
    return this.socket.fromEvent<Bid>(API_ROUTES.BID_WEBSOCKET_EVENT).pipe(
      map((bid) => {
        const currentBids = this.bids.getValue();
        const updatedBids = [...currentBids, bid];
        this.bids.next(updatedBids);
        this.carsService.updateListedCars();
        this.consoleService.emitMessage(
          `${MESSAGES.BIDS_EVENT} - ${bid.user.username} on ${bid.car.name} at $${bid.price}`
        );
      })
    );
  }

  getNewBids() {
    return this.bids.asObservable();
  }

  createBid(createBidDTO: CreateBidDTO) {
    return this.httpClient.post(
      `${environment.api}${API_ROUTES.BID_CREATE}`,
      createBidDTO
    );
  }
}

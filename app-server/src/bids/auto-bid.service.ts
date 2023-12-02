import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { BidsGateway } from 'src/gateways/bids.gateway';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';

@Injectable()
export class AutoBidService {
  constructor(
    @InjectRepository(Bid) private bidsRepository: Repository<Bid>,
    private userService: UsersService,
    @Inject(forwardRef(() => CarsService))
    private carService: CarsService,
    private bidsGateway: BidsGateway,
  ) {}

  @Interval(2000)
  async autoPlaceBids() {
    const users = await this.userService.findAll();
    const cars = await this.carService.findAll();

    const car = this.getRandomIndex(cars);
    const user = this.getRandomIndex(users);

    const bid = new Bid();
    bid.user = user;
    bid.car = car;
    bid.price = this.getBidPrice(car.startingPrice);

    try {
      const newBid = await this.bidsRepository.save(bid);
      this.bidsGateway.emitNewBidEvent(newBid);
    } catch (error) {
      throw new Error(error);
    }
  }

  private getRandomIndex(arr: any[]) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  private getBidPrice(startingPrice: number) {
    const min = startingPrice;
    const max = startingPrice + startingPrice * 0.2;
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateBidDTO } from 'shared/dtos/create-bid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CarsService } from 'src/cars/cars.service';
import { BidsGateway } from 'src/gateways/bids.gateway';
import { UpdateBidDTO } from 'shared/dtos/update-bid.dto';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid) private bidsRepository: Repository<Bid>,
    private userService: UsersService,
    @Inject(forwardRef(() => CarsService))
    private carService: CarsService,
    private bidsGateway: BidsGateway,
  ) {}

  async create(createBidDto: CreateBidDTO) {
    const user = await this.userService.findOne(createBidDto.userId);
    const car = await this.carService.findOne(createBidDto.carId);

    const bid = new Bid();
    bid.user = user;
    bid.car = car;
    bid.price = createBidDto.price;

    const newBid = await this.bidsRepository.save(bid);
    this.bidsGateway.emitNewBidEvent(newBid);

    return newBid;
  }

  findAll() {
    return this.bidsRepository.find();
  }

  findOne(id: number) {
    return this.bidsRepository.findOneBy({ id });
  }

  async update(id: number, updateBidDto: UpdateBidDTO) {
    const bid = await this.bidsRepository.findOneBy({ id });
    if (!bid) throw new Error('Bid is not in database');

    Object.assign(bid, updateBidDto);
    return this.bidsRepository.save(bid);
  }

  async remove(id: number) {
    const bid = await this.bidsRepository.findOneBy({ id });
    if (!bid) throw new Error('Bid is not in database');
    return this.bidsRepository.remove(bid);
  }

  numberOfBidsByCar(carId: number) {
    return this.bidsRepository.count({
      where: { car: { id: carId } },
    });
  }
}

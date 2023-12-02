import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCarDTO } from 'shared/dtos/create-car.dto';
import { UpdateCarDTO } from 'shared/dtos/update-car.dto';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BidsService } from 'src/bids/bids.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @Inject(forwardRef(() => BidsService))
    private bidsService: BidsService,
  ) {}

  create(createCarDto: CreateCarDTO) {
    return this.carRepository.save(createCarDto);
  }

  findAll() {
    return this.carRepository.find();
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) throw new Error(`Car with ID ${id} not found`);
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDTO) {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) throw new Error(`Car with ID ${id} not found`);

    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) throw new Error('Car is not in database');
    return this.carRepository.remove(car);
  }

  async getNumberOfBidsByCar(carId: number) {
    const numberOfBids = await this.bidsService.numberOfBidsByCar(carId);
    return numberOfBids;
  }
}

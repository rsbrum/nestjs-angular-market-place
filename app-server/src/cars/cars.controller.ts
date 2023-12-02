import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from 'shared/dtos/create-car.dto';
import { UpdateCarDTO } from 'shared/dtos/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDTO) {
    const car = this.carService.create(createCarDto);
    return car;
  }

  @Get()
  async findAll() {
    const cars = await this.carService.findAll();
    const carsWithBidsPromises = cars.map(async (car) => {
      const bids = await this.carService.getNumberOfBidsByCar(car.id);
      return { ...car, bids };
    });

    const carsWithBids = await Promise.all(carsWithBidsPromises);
    return carsWithBids;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDTO) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carService.remove(+id);
  }
}

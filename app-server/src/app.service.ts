import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CarsService } from './cars/cars.service';
import { Car } from './cars/entities/car.entity';
import { UsersService } from './users/users.service';
import { promises as fsPromises } from 'fs';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private usersService: UsersService,
    private carsService: CarsService,
  ) {}

  async onModuleInit() {
    this.createCars();
    this.createUsers();
  }

  async createCars() {
    const cars = await this.carsService.findAll();
    if (cars.length > 0) return;

    const carsData: Car[] = await this.readJsonFile(
      `${process.cwd()}/db/cars.seed.json`,
    );

    carsData.forEach((car) => {
      this.carsService.create(car);
    });

    this.logger.log('Created seed cars');
  }

  async createUsers() {
    const users = await this.usersService.findAll();
    if (users.length > 0) return;

    const usersData: User[] = await this.readJsonFile(
      `${process.cwd()}/db/users.seed.json`,
    );

    usersData.forEach((user) => {
      this.usersService.create(user);
    });

    this.logger.log('Created seed users');
  }

  private async readJsonFile(path: string) {
    try {
      const data = await fsPromises.readFile(path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}

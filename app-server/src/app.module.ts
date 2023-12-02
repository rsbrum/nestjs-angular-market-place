import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CarsModule } from './cars/cars.module';
import { BidsModule } from './bids/bids.module';
import { Car } from './cars/entities/car.entity';
import { Bid } from './bids/entities/bid.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/db.sqlite',
      entities: [User, Car, Bid],
      synchronize: true,
    }),
    UsersModule,
    CarsModule,
    BidsModule,
    ScheduleModule.forRoot(),
  ],
  providers: [AppService],
})
export class AppModule {}

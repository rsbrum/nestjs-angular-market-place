import { Module, forwardRef } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { BidsModule } from 'src/bids/bids.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), forwardRef(() => BidsModule)],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}

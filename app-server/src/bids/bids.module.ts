import { Module, forwardRef } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { UsersModule } from 'src/users/users.module';
import { CarsModule } from 'src/cars/cars.module';
import { GatewayModule } from 'src/gateways/gateways.module';
import { AutoBidService } from './auto-bid.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bid]),
    GatewayModule,
    forwardRef(() => CarsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [BidsController],
  providers: [BidsService, AutoBidService],
  exports: [BidsService],
})
export class BidsModule {}

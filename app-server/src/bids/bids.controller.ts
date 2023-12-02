import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BidsService } from './bids.service';
import { UpdateBidDTO } from 'shared/dtos/update-bid.dto';
import { CreateBidDTO } from 'shared/dtos/create-bid.dto';

@Controller('bid')
export class BidsController {
  constructor(private readonly bidService: BidsService) {}

  @Post()
  create(@Body() createBidDto: CreateBidDTO) {
    return this.bidService.create(createBidDto);
  }

  @Get()
  findAll() {
    return this.bidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bidService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBidDto: UpdateBidDTO) {
    return this.bidService.update(id, updateBidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bidService.remove(id);
  }
}

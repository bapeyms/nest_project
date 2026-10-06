import { Module } from '@nestjs/common';
import { LocationService } from './location.service.js';
import { LocationController } from './location.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity.js';
import { City } from './entities/city.entity.js';
import { LocationSeedService } from './location-seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City])],
  controllers: [LocationController],
  providers: [LocationService, LocationSeedService],
})
export class LocationModule {}

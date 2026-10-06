import {Injectable, 
    OnApplicationBootstrap, // дає можливість виконати код автоматично після того, як увесь додаток NestJS та всі його модулі повністю ініціалізовані
    Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {Country} from './entities/country.entity.js';
import {City} from './entities/city.entity.js';
import {Country as CountryCSC, City as CityCSC} from 'country-state-city'

@Injectable()
export class LocationSeedService implements OnApplicationBootstrap {
    private readonly logger = new Logger(LocationSeedService.name);

    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
    ) {}

    async onApplicationBootstrap() {
        await this.seedLocations();
    }

    private async seedLocations() {
        const count = await this.countryRepository.count();
        if (count > 0) {
            this.logger.log('Countries already seeded. Skipping seeding.');
            return;
        }
        this.logger.log('Seeding countries and cities...');

        const allCountries = CountryCSC.getAllCountries();
        for (const c of allCountries) {
            const country = this.countryRepository.create({
                name: c.name,
                isoCode: c.isoCode,
            });
            const savedCountry = await this.countryRepository.save(country);
            const countryCities = CityCSC.getCitiesOfCountry(c.isoCode) || [];
            if (countryCities.length > 0) {
                const citiesToSave = countryCities.slice(0, 20).map((city) => {
                    return this.cityRepository.create({
                        name: city.name,
                        country: savedCountry,
                    });
                });
                await this.cityRepository.save(citiesToSave);
            }
            this.logger.log(`Seeded country: ${c.name} with ${countryCities.length} cities.`);
        }
    }
}
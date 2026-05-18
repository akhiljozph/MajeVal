import { inject, injectable } from "inversify";

import AppService from "../services/app.service.ts";
import CountryRepository from "../repositories/country.repository.ts";

@injectable()
export default class AppController {
    constructor(
        @inject(AppService) private appService: AppService,
        @inject(CountryRepository) private countryRepository: CountryRepository
    ) { }

    async addCountry(country: any) {
        try {
            const result = await this.countryRepository.findCountry(country);

            if (result) {
                throw new Error('FOUND');
            }

            this.appService.addCountry(country);
        } catch (error) {
            throw error;
        }
    }
}
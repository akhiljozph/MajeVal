import { inject, injectable } from "inversify";

import AppService from "../services/app.service.ts";
import CountryRepository from "../repositories/country.repository.ts";

@injectable()
export default class AppController {
    constructor(
        @inject(AppService) private appService: AppService
    ) { }

    async addCountry(country: any) {
        try {
            const result = await this.appService.findCountry(country);

            if (result) {
                throw new Error('FOUND');
            }

            this.appService.addCountry(country);
        } catch (error) {
            throw error;
        }
    }
}
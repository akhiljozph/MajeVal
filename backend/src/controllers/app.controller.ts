import { inject, injectable } from "inversify";

import AppService from "../services/app.service.ts";

@injectable()
export default class AppController {
    constructor(
        @inject(AppService) private appService: AppService
    ) { }

    async getCountries() {
        try {
            return await this.appService.getCountries();
        } catch (error) {
            throw error
        }
    }

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

    async checkEmailAvailability(emailAddress: string) {
        try {
            const result = await this.appService.checkEmailAvailability(emailAddress);

            return result ? true : false;
        } catch (error) {
            throw error
        }
    }
}
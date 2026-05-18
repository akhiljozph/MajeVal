import { inject, injectable } from "inversify";

import AppService from "../services/app.service.ts";
import AppRepository from "../repositories/app.repository.ts";

@injectable()
export default class AppController {
    constructor(
        @inject(AppService) private appService: AppService,
        @inject(AppRepository) private appRepository: AppRepository
    ) { }

    async addCountry(country: any) {
        try {
            const result = await this.appRepository.findCountry(country);

            if (result) {
                throw new Error('FOUND');
            }

            this.appService.addCountry(country);
        } catch (error) {
            throw error;
        }
    }
}
import { inject, injectable } from "inversify";
import AppRepository from "../repositories/app.repository.ts";

@injectable()
export default class AppService {
    constructor(@inject(AppRepository) private appRepository: AppRepository) { }


    addCountry(country: any) {
        try {
            this.appRepository.addCountry(country);
        } catch (error) {
            throw error;
        }
    }
}
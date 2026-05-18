import { inject, injectable } from "inversify";
import CountryRepository from "../repositories/country.repository.ts";

@injectable()
export default class AppService {
    constructor(@inject(CountryRepository) private countryRepository: CountryRepository) { }


    addCountry(country: any) {
        try {
            this.countryRepository.addCountry(country);
        } catch (error) {
            throw error;
        }
    }
}
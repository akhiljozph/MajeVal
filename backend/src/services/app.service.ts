import { inject, injectable } from "inversify";
import CountryRepository from "../repositories/country.repository.ts";

@injectable()
export default class AppService {
    constructor(@inject(CountryRepository) private countryRepository: CountryRepository) { }

    async getCountries() {
        try {
            return await this.countryRepository.getCountries();
        } catch (error) {
            throw error;
        }
    }

    addCountry(country: any) {
        try {
            this.countryRepository.addCountry(country);
        } catch (error) {
            throw error;
        }
    }

    async findCountry(country: any) {
        try {
            return await this.countryRepository.findCountry(country);
        } catch (error) {
            throw error;
        }
    }
}
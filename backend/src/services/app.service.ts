import { inject, injectable } from "inversify";
import CountryRepository from "../repositories/country.repository.ts";
import AccountRepository from "../repositories/account.repository.ts";

@injectable()
export default class AppService {
    constructor(
        @inject(CountryRepository) private countryRepository: CountryRepository,
        @inject(AccountRepository) private accountRepository: AccountRepository
) { }

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

    async checkEmailAvailability(emailAddress: string) {
        try {
            return await this.accountRepository.findAccountByEmail(emailAddress);
        } catch (error) {
            throw error;
        }
    }
}
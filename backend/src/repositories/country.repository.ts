import { injectable } from "inversify";

import Country from "../models/country.model.ts";

@injectable()
export default class CountryRepository {
    constructor() { }

    async addCountry(country: any) {
        try {
            await Country.insertOne(country);
        } catch (error) {
            throw error;
        }
    }

    async findCountry(country: any) {
        try {
            console.log(country)
            return await Country.findOne({ "countryCode": `${country?.countryCode}` });
        } catch (error) {
            throw error;
        }
    }
}
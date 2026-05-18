import { injectable } from "inversify";

import Country from "../models/country.model.ts";

@injectable()
export default class AppRepository {
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
            return await Country.findOne({ "code": `${country?.code}` });
        } catch (error) {
            throw error;
        }
    }
}
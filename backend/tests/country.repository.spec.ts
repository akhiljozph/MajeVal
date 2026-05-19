import { MongoMemoryServer } from "mongodb-memory-server";

import mongoose from "mongoose";

import "reflect-metadata";

import countryModel from "../src/models/country.model.ts";
import CountryRepository from "../src/repositories/country.repository.ts";

describe("CountryRepository", () => {
    let mongoServer: MongoMemoryServer;
    let repository: CountryRepository;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        repository = new CountryRepository();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("should insert a new country into the database", async () => {
        const countryData = {
            "code": "IND",
            "countryCode": "+91",
            "countryName": "India"
        };

        const result = await repository.addCountry(countryData);

        expect(result).toBeDefined();
        expect(result.countryName).toBe('India');

        const dbCheck = await countryModel.findOne({"code": "IND"});
        expect(dbCheck).not.toBeNull();
    });
});
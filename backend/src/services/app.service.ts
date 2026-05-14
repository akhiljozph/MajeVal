import { inject, injectable } from "inversify";
import AppRepository from "../repositories/app.repository.ts";

@injectable()
export default class AppService {
    constructor(@inject(AppRepository) private appRepository: AppRepository) { }


    addCountry() {
        console.log('Inside service.')
    }
}
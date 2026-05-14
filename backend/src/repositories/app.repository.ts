import { injectable } from "inversify";

@injectable()
export default class AppRepository {
    constructor() { }

    addCountry() {
        console.log('Inside repository.')
    }
}
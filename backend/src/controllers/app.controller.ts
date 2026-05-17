import { inject, injectable } from "inversify";

import AppService from "../services/app.service.ts";

@injectable()
export default class AppController {
    constructor(@inject(AppService) private appService: AppService) { }

    addCountry() {
        this.appService.addCountry();
    }
}
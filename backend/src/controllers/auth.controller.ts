import { inject, injectable } from "inversify";

import AuthService from "../services/auth.service.ts";

@injectable()
export default class AuthController {
    constructor(
        @inject(AuthService) private authService: AuthService
    ) { }

    async addAccount(account: any) {
        try {
            await this.authService.addAccount(account);
        } catch (error) {
            throw error;
        }
    }
}
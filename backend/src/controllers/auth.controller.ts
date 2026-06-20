import { inject, injectable } from "inversify";

import MailTransporter from "../helpers/mail-transporter.ts";
import AuthService from "../services/auth.service.ts";

@injectable()
export default class AuthController {
    constructor(
        @inject(AuthService) private authService: AuthService,
        @inject(MailTransporter) private mailTransporter: MailTransporter
    ) { }

    async addAccount(account: any) {
        try {
            const accountCreationResult = await this.authService.addAccount(account);

            const { firstName, email, role } = accountCreationResult;

            if (role !== 'superadmin') {
                await this.mailTransporter.sendWelcomeEmail(email, firstName, role!);
            }

        } catch (error) {
            throw error;
        }
    }

    async verifyAccount(account: any) {
        try {
            const { username, password } = account.body;

            await this.authService.verifyAccount(username, password);
        } catch (error) {
            throw error;
        }
    }
}
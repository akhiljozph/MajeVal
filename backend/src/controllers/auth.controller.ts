import { inject, injectable } from "inversify";

import AuthService from "../services/auth.service.ts";
import MailTransporter from "../helpers/mail-transporter.ts";

@injectable()
export default class AuthController {
    constructor(
        @inject(AuthService) private authService: AuthService,
        @inject(MailTransporter) private mailTransporter: MailTransporter
    ) { }

    async addAccount(account: any) {
        try {
            const accountCreationresult = await this.authService.addAccount(account);

            const { firstName, email, role } = accountCreationresult;

            if (role !== 'superadmin') {
                await this.mailTransporter.sendWelcomeEmail(email, firstName, role!);
            }

        } catch (error) {
            throw error;
        }
    }
}
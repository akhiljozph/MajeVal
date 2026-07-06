import { inject, injectable } from "inversify";
import { type Request } from "express";


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

    async verifySignIn(account: any) {
        try {
            const { username, password } = account;

            return await this.authService.verifySignIn(username, password);
        } catch (error) {
            throw error;
        }
    }

    async refreshSession(req: Request) {
        try {
            const tokenFromCookie = req.cookies?.refreshToken;
            if (!tokenFromCookie) {
                throw new Error('Hey, failed to authenticate you token. You need to login again.');
            }

            return await this.authService.refreshSession(tokenFromCookie);
        } catch (error) {
            throw error;
        }
    }
}
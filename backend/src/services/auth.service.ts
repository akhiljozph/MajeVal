// import { z } from 'zod';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";

import AccountRepository from "../repositories/account.repository.ts";
// import type { signupSchema } from "../schemas/auth.schema.ts";

// type TAccount = z.infer<typeof signupSchema>;
@injectable()
export default class AuthService {

    private get tokenExpiresIn() {
        return Number(process.env.JWT_EXPIRES_IN);
    }

    private get JWTSecret() {
        return process.env.JWT_SECRET;
    }

    private get JWTRefreshSecret() {
        return process.env.JWT_REFRESH_SECRET;
    }

    private get refreshTokenExpiresIn() {
        return Number(process.env.JWT_REFRESH_EXPIRES_IN);
    }

    constructor(@inject(AccountRepository) private accountRepository: AccountRepository) { }

    async addAccount(account: any) {
        try {
            return await this.accountRepository.addAccount(account);
        } catch (error) {
            throw error;
        }
    }

    async verifySignIn(username: string, password: string) {
        try {
            const account: any = await this.accountRepository.findAccountByUsername(username);

            if (!account) {
                throw new Error('Oops!, Check the provided username, we can\'t find it in our records.');
            }

            await this.verifyCredentials(password, account?.password);

            const accessToken = this.generateAccessToken(account._id, account.role, account.email);
            const refreshToken = this.generateRefreshToken(account._id, account.role, account.email);

            return {
                refreshToken,
                accessToken,
                accountInfo: {
                    id: account._id,
                    firstName: account.firstName,
                    middleName: account.middleName,
                    lastName: account.lastName,
                    email: account.email,
                    country: account.country,
                    mobileNumber: account.mobileNumber,
                    dateOfBirth: account.dateOfBirth,
                    username: account.username,
                    gender: account.gender,
                    role: account.role,
                }
            };
        } catch (error) {
            throw error;
        }
    }

    private async verifyCredentials(payloadPassword: string, password: string) {
        const doesPasswordMatched = await bcrypt.compare(payloadPassword, password);

        if (!doesPasswordMatched) {
            throw new Error('Hmm!, Seems like you forgot your password. Double check it and proceed to login again.')
        }
    }

    public generateAccessToken(userId: string, role: string, email: string): string {
        const tokenPayload = {
            userId,
            role,
            email
        };

        return jwt.sign(
            tokenPayload,
            this.JWTSecret as string, {
            expiresIn: this.tokenExpiresIn
        });
    }

    public generateRefreshToken(userId: string, role: string, email: string): string {
        const tokenPayload = {
            userId,
            role,
            email
        };

        return jwt.sign(tokenPayload, this.JWTRefreshSecret as string, { expiresIn: this.refreshTokenExpiresIn })
    }

    async refreshSession(tokenFromCookie: string) {
        try {
            const decoded = jwt.verify(tokenFromCookie, this.JWTRefreshSecret as string) as { userId: string, role: string, email: string };

            const newAccessToken = this.generateAccessToken(decoded.userId, decoded.role, decoded.email);

            return { accessToken: newAccessToken };
        } catch (error) {
            throw error;
        }
    }

}
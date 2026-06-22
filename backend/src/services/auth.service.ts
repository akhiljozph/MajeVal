// import { z } from 'zod';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { inject, injectable } from "inversify";

import AccountRepository from "../repositories/account.repository.ts";
// import type { signupSchema } from "../schemas/auth.schema.ts";

// type TAccount = z.infer<typeof signupSchema>;
@injectable()
export default class AuthService {

    constructor(@inject(AccountRepository) private accountRepository: AccountRepository) { }

    private get tokenExpiresIn() {
        return Number(process.env.JWT_EXPIRES_IN);
    }

    private get JWTSecret() {
        return process.env.JWT_SECRET;
    }

    async addAccount(account: any) {
        try {
            return await this.accountRepository.addAccount(account);
        } catch (error) {
            throw error;
        }
    }

    async verifyAccount(username: string, password: string) {
        try {
            const account: any = await this.accountRepository.findAccountByUsername(username);

            if (!account) {
                throw new Error('Invalid username.');
            }

            if (account?.password !== password) {
                throw new Error('Incorrect password.')
            }

            const tokenPayload = {
                userId: account._id,
                role: account.role,
                email: account.email
            };
            const token = jwt.sign(
                tokenPayload,
                this.JWTSecret as string, {
                expiresIn: this.tokenExpiresIn
            });

            return {
                token,
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

}
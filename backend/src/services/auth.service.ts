import { inject, injectable } from "inversify";
import AccountRepository from "../repositories/account.repository.ts";

@injectable()
export default class AuthService {

    constructor(@inject(AccountRepository) private accountRepository: AccountRepository) { }

    async addAccount(account: any) {
        try {
            return await this.accountRepository.addAccount(account);
        } catch (error) {
            throw error;
        }
    }

    async verifyAccount(username: string, password: string) {
        try {
            const account = await this.accountRepository.findAccountByUsername(username);

            if (!account) {
                throw new Error('Invalid username.');
            }
        } catch (error) {
            throw error;
        }
    }

}
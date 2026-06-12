import { inject, injectable } from "inversify";
import AccountRepository from "../repositories/account.repository.ts";

@injectable()
export default class AuthService {

    constructor(@inject(AccountRepository) private accountRepository: AccountRepository) { }

    async addAccount(account: any) {
        try {
            await this.accountRepository.addAccount(account);
        } catch (error) {
            throw error;
        }
    }

}
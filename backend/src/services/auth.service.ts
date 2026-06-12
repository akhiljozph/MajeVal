import { inject, injectable } from "inversify";
import AccountRepository from "../repositories/account.repository.ts";

@injectable()
export default class AppService {

    constructor(@inject(AccountRepository) private accountRepository: AccountRepository) { }

    addAccount(account: any) {
        try {
            this.accountRepository.addAccount(account);
        } catch (error) {
            throw error;
        }
    }

}
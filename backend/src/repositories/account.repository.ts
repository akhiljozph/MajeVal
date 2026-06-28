import { injectable } from "inversify";

import Account from "../models/account.model.ts";

@injectable()
export default class AccountRepository {
    constructor() { }

    async addAccount(account: any) {
        try {
            return await Account.insertOne(account);
        } catch (error) {
            throw error;
        }
    }

    async findAccountByUsername(username: string) {
        try {
            return Account.findOne({ username: username });
        } catch (error: any) {
            throw error;
        }
    }

    async findAccountByEmail(emailAddress: string) {
        try {
            return Account.exists({ email: emailAddress });
        } catch (error: any) {
            throw error;
        }
    }
}
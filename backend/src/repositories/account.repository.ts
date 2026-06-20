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
            return Account.find({ username: username });
        } catch (error: any) {
            throw error;
        }
    }
}
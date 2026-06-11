import { inject, injectable } from "inversify";

import AuthService from "../services/auth.service.ts";

@injectable()
export default class AuthController {
    constructor(
        @inject(AuthService) private authService: AuthService
    ) { }


}
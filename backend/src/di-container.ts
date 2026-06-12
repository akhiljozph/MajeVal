import { Container } from 'inversify';
import 'reflect-metadata';

import AppController from './controllers/app.controller.ts';
import AuthController from './controllers/auth.controller.ts';
import AccountRepository from './repositories/account.repository.ts';
import CountryRepository from './repositories/country.repository.ts';
import AppService from './services/app.service.ts';
import AuthService from './services/auth.service.ts';
import MailTransporter from './helpers/mail-transporter.ts';

const container = new Container();

container.bind<AppController>(AppController).toSelf();
container.bind<AppService>(AppService).toSelf();
container.bind<CountryRepository>(CountryRepository).toSelf();

container.bind<AuthController>(AuthController).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AccountRepository>(AccountRepository).toSelf();

container.bind<MailTransporter>(MailTransporter).toSelf();

export { container };


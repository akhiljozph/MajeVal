import 'reflect-metadata';
import { Container } from 'inversify';

import AppController from './controllers/app.controller.ts';
import AppService from './services/app.service.ts';
import CountryRepository from './repositories/country.repository.ts';

const container = new Container();

container.bind<AppController>(AppController).toSelf();
container.bind<AppService>(AppService).toSelf();
container.bind<CountryRepository>(CountryRepository).toSelf();

export { container };
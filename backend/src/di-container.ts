import 'reflect-metadata';
import { Container } from 'inversify';

import AppController from './controllers/app.controller.ts';
import AppService from './services/app.service.ts';
import AppRepository from './repositories/app.repository.ts';

const container = new Container();

container.bind<AppController>(AppController).toSelf();
container.bind<AppService>(AppService).toSelf();
container.bind<AppRepository>(AppRepository).toSelf();

export { container };
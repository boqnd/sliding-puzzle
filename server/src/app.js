import nocache from 'nocache';
import express from 'express';
import routes from './routes/index.js';
import handleError from './middlewares/errorHandler.js';
import Knex from 'knex';
import { Model } from 'objection';
import config from '../knexfile.js';

export default class App {
  express;

  constructor() {
    this.express = express();
    this.initLogger();
    this.setupPrerequisites();
    this.mountRoutes();
  }

  initLogger() {
    // TODO: Initialize logger with winston
  }

  async init() {
    console.log('Initializing application');
    const knexClient = Knex(config.development);
    Model.knex(knexClient);
  }

  async exit() {
    console.log('Exiting application');
    // TODO: Stop dependencies
  }

  setupPrerequisites() {
    const jsonParser = express.json({ limit: '20mb' });

    this.express.use(jsonParser);
    this.express.use(nocache());
  }

  mountRoutes() {
    this.express.use('/api', routes);
    this.express.use(handleError);
  }
}

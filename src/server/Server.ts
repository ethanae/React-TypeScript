import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from 'path';
require('dotenv').config();

import UserService from "./services/UserService";

class Server {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use('/', express.static(path.join(__dirname, '/../public')));
  }

  private routes(): void {
    let router = express.Router();

    router.post('/api/user', async (req, res) => {
      const result = await UserService.createUser(req.body);
      if(result[0])
        res.status(201).json(result[1]);
      else
        res.sendStatus(400);
    });

    router.get('/api/user/id/:idNumber', async (req, res) => {
      let user = await UserService.getUserByIdNumber(req.params.idNumber);
      if(!user)
        res.status(404).json(`User with ID number ${req.params.idNumber} not found`);
      else
        res.status(200).json(user);
    });

    router.delete('/api/user/id/:idNumber', async (req, res) => {
      let user = await UserService.deleteUserByIdNumber(req.params.idNumber);
      if(!user)
        res.status(404).json(`User with ID number ${req.params.idNumber} not found`);
      else
        res.sendStatus(202);
    });

    this.express.use(router);
  }
}

export default new Server().express;
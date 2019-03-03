import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from 'path';

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
    this.express.use('/', express.static(path.join(__dirname, '/../public/')));
  }

  private routes(): void {
    let router = express.Router();

    router.get('/api/users', async (req, res) => {
      try {
        const users = await UserService.getUsers();
        return res.status(200).json(users);
      } catch (error) {
        res.status(500).json("Couldn't get users from server");
      }
    });

    router.post('/api/users', async (req, res) => {
      const result = await UserService.createUser(req.body);
      if(result[0])
        res.status(201).json(result[1]);
      else
        res.sendStatus(400);
    });

    router.get('/api/users/:idNumber', async (req, res) => {
      let user = await UserService.findUsers({ idNumber: { $regex: req.params.idNumber, $options: 'i' } });
      if(!user)
        res.status(404).json(`No users found for ${req.params.idNumber}`);
      else
        res.status(200).json(user);
    });

    router.delete('/api/users/:idNumber', async (req, res) => {
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
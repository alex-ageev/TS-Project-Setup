
import express from "express";
import { setupSwagger } from "./swagger.js";
import logger from './logger.js';
import requestLogger from './requestLogger.js';

const app = express();

setupSwagger(app);
app.use(requestLogger);

function testFunction(name: string): void {
  console.log(name, 'works...')
}

testFunction('OK')

app.use(express.json());

interface IUser {
  id: number;
  name: string;
  password: string;
}

let users: IUser[] = [{ id: 1, name: "Utilizador1", password: "123" }];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Returns an array of users
 */
app.get("/users", (req: express.Request, res: express.Response) => {
  res.json(users);
});

//get user by id
app.get("/users/:id", (req: express.Request, res: express.Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
});
// create user
app.post("/users", (req: express.Request, res: express.Response) => {
  const user: IUser = {
    id: users.length + 1,
    name: req.body.name,
    password: req.body.password,
  };
  users.push(user);
  res.json(user);
});
// update user
app.put("/users/:id", (req: express.Request, res: express.Response) => {
  let user = users.find((u) => u.id === parseInt(req.params.id)) as IUser;
  if (!user) res.status(404).send("Utilizador não encontrado.");
  user.name = req.body.name;
  res.json(user);
});

app.delete("/users/:id", (req: express.Request, res: express.Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id)) as IUser;
  if (!user) res.status(404).send("Utilizador não encontrado.");
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json(user);
});

app.listen(5000, () => {
  logger.info(`Server started on port 5000`);
});
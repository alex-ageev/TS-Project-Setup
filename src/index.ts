// import { testFunction } from './modules/test.js'
import express from 'express';
import bodyParser from 'body-parser';

interface IUser {
  id: number;
  name: string;
  email: string;
}
const app = express();
app.use(bodyParser.json());

let users: IUser[] = [];

users = [{ id: 1, name: "Alex", email: "api@gmail.com" },
{ id: 2, name: "Fiama", email: "fiama@gmail.com" }]

users.push({ id: 3, name: "Maria", email: "maria@gmail.com" })


// Get users
app.get('/users', (req: express.Request, res: express.Response) => {
  return res.json(users)
});

// Get user by id
app.get('/users/:id', (req: express.Request, res: express.Response) => {
  const userId = parseInt(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user)
});

// Create a new user
app.post('/users', (req: express.Request, res: express.Response) => {
  console.log(req.body);
  const newUser: IUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  }

  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete('/users/:id', (req: express.Request, res: express.Response) => {
  const userId = parseInt(req.params.id);

  const deletedUserIndex = users.findIndex((user) => user.id === userId);

  if (deletedUserIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(deletedUserIndex, 1)[0];
  res.json(deletedUser);
});

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
})



const msg: string = 'Hello NodeJS with TS!';
console.log(msg)

// testFunction('index.ts')
// import { testFunction } from './modules/test.js'
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routers/userRouter.js'
import deviceRouter from './routers/deviceRouter.js'
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';


// App creation
const app = express();

const MONGO_URI = 'mongodb+srv://user:user@cluster0.p1fsqgv.mongodb.net/?retryWrites=true&w=majority';


app.use(cors({
  origin: '*'
}));

// Request body recognition
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(fileUpload());

// Import user routes
app.use('/users', userRouter);

// Import device routes
app.use('/devices', deviceRouter);

// The data format
app.use(express.json());

// Port number
const PORT = 7878;


const startApp = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_URI);
  console.log('Successfully connected to db')
  // Start server
  app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
  });
}
startApp();
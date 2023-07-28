// import { testFunction } from './modules/test.js'
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routers/userRouter.js'
import deviceRouter from './routers/deviceRouter.js'
import cors from 'cors';

// App creation
const app = express();

app.use(cors({
  origin: '*'
}));


// Request body recognition
app.use(bodyParser.json());

// Import user routes
app.use('/users', userRouter);

// Import device routes
app.use('/devices', deviceRouter);

// The data format
app.use(express.json());

// Port number
const PORT = 5555;

// Start server
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
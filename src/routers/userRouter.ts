import express from 'express';
import UserController from './../controllers/UserController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware, UserController.getAll);
router.get('/:id', UserController.getOne);
router.post('/register', UserController.register);
// router.delete('/:id', UserController.delete);
// router.put('/:id', UserController.update);


export default router;
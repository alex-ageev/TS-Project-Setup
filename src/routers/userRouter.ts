import express from 'express';
import UserController from './../controllers/UserController.js'

const router = express.Router();

router.get('/', UserController.getAll);
// router.get('/:id', UserController.getOne);
// router.post('/', UserController.create);
// router.delete('/:id', UserController.delete);
// router.put('/:id', UserController.update);


export default router;
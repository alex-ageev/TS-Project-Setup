import express from 'express';
import AuthController from './../controllers/AuthController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', AuthController.getAll);
router.post('/roles', AuthController.createRole);
router.delete('/roles/:id', AuthController.deleteRole);

// router.get('/:id', UserController.getOne);
router.post('/register', AuthController.register);
// router.post('/', UserController.register);
// router.delete('/:id', UserController.delete);
// router.put('/:id', UserController.update);

export default router;
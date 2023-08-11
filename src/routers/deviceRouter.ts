import express from 'express';
import DeviceController from './../controllers/DeviceController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();
import * as validationsMiddleware from '../utils/validations.js';

router.get('/devices', DeviceController.getAll);
router.post('/types', DeviceController.createType);
router.post('/brands', DeviceController.createBrand);
router.delete('/brands/:id', DeviceController.deleteBrand);
router.delete('/types/:id', DeviceController.deleteType);

router.get('/brands', DeviceController.getBrands);
router.get('/types', DeviceController.getTypes);
router.get('/:id', DeviceController.getOne);
router.delete('/devices/:id', authMiddleware, DeviceController.delete);

router.post('/', authMiddleware, validationsMiddleware.deviceValidation, DeviceController.create);
router.post('/types', validationsMiddleware.typeValidation, DeviceController.createType);
router.post('/brands', validationsMiddleware.brandValidation, DeviceController.createBrand);


router.put('/:id', DeviceController.update);

export default router;
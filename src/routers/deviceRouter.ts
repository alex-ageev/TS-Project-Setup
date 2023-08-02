import express from 'express';
import DeviceController from './../controllers/DeviceController.js'
const router = express.Router();

router.get('/brands', DeviceController.getBrands);
router.get('/types', DeviceController.getTypes);
router.get('/:id', DeviceController.getOne);
router.delete('/:id', DeviceController.delete);
router.get('/', DeviceController.getAll);
router.post('/', DeviceController.create);


export default router;
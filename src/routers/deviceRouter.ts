import express from 'express';
import DeviceController from './../controllers/DeviceController.js'
const router = express.Router();

router.post('/types', DeviceController.createType);
router.post('/brands', DeviceController.createBrand);
router.delete('/brands/:id', DeviceController.deleteBrand);
router.delete('/types/:id', DeviceController.deleteType);

router.get('/brands', DeviceController.getBrands);
router.get('/types', DeviceController.getTypes);
router.get('/:id', DeviceController.getOne);
router.delete('/:id', DeviceController.delete);
router.get('/', DeviceController.getAll);
router.post('/', DeviceController.create);
router.put('/:id', DeviceController.update);

export default router;
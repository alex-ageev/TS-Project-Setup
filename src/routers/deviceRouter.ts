import express from 'express';
import DeviceController from './../controllers/DeviceController.js'
const router = express.Router();

router.get('/brands', DeviceController.getBrands);
router.get('/types', DeviceController.getTypes);
router.get('/', DeviceController.getAll);

export default router;
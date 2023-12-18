const express = require('express');
const sampleController = require('../controllers/sampleController');
const authController = require('../controllers/authController');
const foodController = require('../controllers/foodsController');
const axiosController = require('../controllers/axiosController');
const verifytoken = require('../middleware/verifytoken');
const router = express.Router();

router.get('/', sampleController.methodGet)
router.post('/', sampleController.methodPost)
router.put('/', sampleController.methodPut)
router.delete('/', sampleController.methodDelete)

router.post('/register', authController.register);
router.post('/login', authController.login);

// foods
router.post('/foods', foodController.methodPost);
router.get('/foods', verifytoken, foodController.methodGet);
router.get('/foods/:id', foodController.methodGetId);
router.put('/foods/:id', foodController.methodPut);
router.delete('/foods/:id', foodController.methodDelete);

router.post('/foods/upload', foodController.methodUploadFoods);
router.post('/foods/search', foodController.methodGetCondition);

router.post('/predict', axiosController.postData);

module.exports = router;
const express = require('express');
const sampleController = require('../controllers/sampleController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', sampleController.methodGet)
router.post('/', sampleController.methodPost)
router.put('/', sampleController.methodPut)
router.delete('/', sampleController.methodDelete)

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
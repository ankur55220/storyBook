
import express from 'express'
import { RegisterController,LoginController } from '../controller/userController.js';

const router=express.Router();


router.route('/login').post(LoginController);
router.route('/signup').post(RegisterController);


export default router
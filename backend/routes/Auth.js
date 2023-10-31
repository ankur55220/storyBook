
import express from 'express'
import { RegisterController,LoginController,imageUpload } from '../controller/userController.js';

const router=express.Router();


router.route('/login').post(LoginController);
router.route('/signup').post(RegisterController);
router.route('/uploadImg').post(imageUpload);


export default router
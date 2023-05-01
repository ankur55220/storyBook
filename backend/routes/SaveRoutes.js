import express from "express"
import { ValidatorMiddleware } from "../middleware/Validator.js";
import {AddSave,getAllSaved,getSingleSaved,deleteSaved,updateSave} from '../controller/saveController.js'
const router=express.Router();

router.use(ValidatorMiddleware)

router.route("/getAllSaved").get(getAllSaved)
router.route("/AddSave").post(AddSave)
router.route("/getSingleSaved").post(getSingleSaved)
router.route("/deleteSaved").post(deleteSaved)
router.route("/updateSave").post(updateSave)


export default router
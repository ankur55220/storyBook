import express from "express"
import { ValidatorMiddleware } from "../middleware/Validator.js";
import {sendFalse,RemovefavAudio,AddfavAudio,getSingleAudio,getAllLoggedInFav,loginAudio,AddNewAudio,removeAudio,getAllAudios,getAllAudiosBy} from '../controller/audioController.js'

const router=express.Router();


router.use(ValidatorMiddleware)
router.route("/sendFalse").post(sendFalse)
router.route("/AddNewAudio").post(AddNewAudio)
router.route("/removeAudio").post(removeAudio)
router.route("/getAllAudios").get(getAllAudios)
router.route("/getAllAudiosBy").post(getAllAudiosBy)
router.route("/loginAudio").post(loginAudio)
router.route("/getAllLoggedInFav").post(getAllLoggedInFav)
router.route("/getSingleAudio").post(getSingleAudio)
router.route("/AddfavAudio").post(AddfavAudio)
router.route("/RemovefavAudio").post(RemovefavAudio)




export default router


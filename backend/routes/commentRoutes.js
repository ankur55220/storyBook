import express from "express"
import { ValidatorMiddleware } from "../middleware/Validator.js";
import {AddReply,AddComment,deleteComment,updateComment,getAllComments} from "../controller/commentController.js"
const router=express.Router();

router.use(ValidatorMiddleware)


router.route("/getAllComments").post(getAllComments)
router.route("/AddComment").post(AddComment)
router.route("/updateComment").post(updateComment)
router.route("/deleteComment").post(deleteComment)
router.route("/AddReply").post(AddReply)





export default router
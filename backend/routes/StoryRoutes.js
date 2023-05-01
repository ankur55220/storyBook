import express from "express"
import { ValidatorMiddleware } from "../middleware/Validator.js";
import {AddLikes,AddAudioNotify,markAsSeen,AddNotification,getNamesAndId,removeAudioFromFavourite,removeScriptFromFavourite,unPublishScript,unPublishAudio,deleteSave,addFavourite,getpublishedById,updateFav,getSingleBookMark,getAllBookMark,removeBookmark,addbookmark,getSingleSave,publishStory,updateedit,editSave,getUserId,storiesPublishedByUser,getAllFav,AddNewStory,getAllStory,getAllpublishedStories,getAllUnPublishedStories,AllStoriesByUser,getSingleStory,updateStory,deleteStory} from "../controller/storyController.js"
const router=express.Router();


router.use(ValidatorMiddleware);


router.route("/getAllScripts").get(getAllStory);
router.route("/addStory").post(AddNewStory);
router.route("/getAllPublishedStories").get(getAllpublishedStories)
router.route("/getAllUnPublishedStories").get(getAllUnPublishedStories)
router.route("/AllStoriesByUser").post(AllStoriesByUser)
router.route("/getSingleStory").post(getSingleStory)
router.route("/updateStory").get(updateStory)
router.route("/deleteStory").get(deleteStory)
router.route("/getAllFav").post(getAllFav)
router.route("/storiesPublishedByUser").post(storiesPublishedByUser)
router.route("/getUserId").post(getUserId)

router.route("/editSave").post(editSave)
router.route("/updateedit").post(updateedit)
router.route("/publishStory").post(publishStory)
router.route("/getSingleSave").post(getSingleSave)
router.route("/addbookmark").post(addbookmark)
router.route("/removeBookmark").post(removeBookmark)
router.route("/getAllBookMark").post(getAllBookMark)
router.route("/getSingleBookMark").post(getSingleBookMark)
router.route("/updateFav").post(updateFav)
router.route("/getpublishedById").post(getpublishedById)
router.route("/addFavourite").post(addFavourite)
router.route("/deleteSave").post(deleteSave)
router.route("/unPublishAudio").post(unPublishAudio)
router.route("/unPublishScript").post(unPublishScript)
router.route("/removeScriptFromFavourite").post(removeScriptFromFavourite)
router.route("/removeAudioFromFavourite").post(removeAudioFromFavourite)
router.route("/getNamesAndId").post(getNamesAndId)
router.route("/AddNotification").post(AddNotification)
router.route("/markAsSeen").post(markAsSeen)
router.route("/AddAudioNotify").post(AddAudioNotify)
router.route("/AddLikes").post(AddLikes)














export default router;

import mongoose from "mongoose";
import { Comment} from "../model/Comment.js";
import { AsyncMiddleWare } from "../middleware/AsyncMiddleWare.js";
import {User} from "../model/User.js"


export const AddComment=AsyncMiddleWare(async (req,res,next)=>{


    const {id} =req.user.user
    const {body,postId}=req.body;

    if(!body || !postId){
        res.status(404);

        throw new Error("fields cant be empty")
        return 
    }

const newComment =await  Comment.create({
    body,
    author:id,
    parent:"-1",
    postId
})

await newComment.save();

res.status(200).json({
    success:true,
    msg:"comment added successfully"
})

})


export const AddReply=AsyncMiddleWare(async (req,res,next)=>{


    const {id} =req.user.user
    const {body,postId,comId}=req.body;

    if(!body || !postId || !comId){
        res.status(404);

        throw new Error("fields cant be empty")
        return 
    }

const newComment =await  Comment.create({
    body,
    author:id,
    parent:comId,
    postId
})

await newComment.save();

res.status(200).json({
    success:true,
    msg:"comment added successfully"
})

})

export const deleteComment=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user;
    const {commId,author}=req.body;

    if(author!=id){
        res.status(401)
        throw new Error("dont have the permission to delete someone elses comment")
        return
    }

    const deletedComm=await Comment.findByIdAndDelete(commId);

    if(!deletedComm){
        res.status(404)
        throw new Error("no such comment exists")
    }

    res.status(200).json({
        success:true,
        msg:"comment was deleted successfully"
    })


})

export const updateComment=AsyncMiddleWare(async(req,res,next)=>{
    const {id}=req.user;
    const {commId,author,body}=req.body;

    if(author!=id){
        res.status(401)
        throw new Error("dont have the permission to delete someone elses comment")
        return
    }

    if(!body){
        res.status(404)
        throw new Error("body field cant be empty")
        return
    }

    const updatedComment=await Comment.findByIdAndUpdate(commid,{body:{$set:body}})

    if(updatedComment){
        res.status(404)
        throw new Error("no such comment exists")
        return 
    }

    res.status(200).json({
        success:true,
        msg:"comment updated successfully"
    })


})

export const getAllComments=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user
    const {postId}=req.body;


    if(!postId){
        res.status(404)
        throw new Error("postid is required")
        return
    }


    const user=await User.findById(id)
    const allComments=await Comment.find({postId:postId});


    const totalLike=allComments.map((item)=>{
        return {commentId:item._id,like:item.likes}
    })
    const totalDislikes=allComments.map((item)=>{
        return {commentId:item._id,dislike:item.dislikes}
    })



    const liked = allComments.map((item)=>{

        if(user.likes.filter((item1)=>item1.id==item._id).length>0){
            return {
                commentId:item._id,
                liked:true
            }
        }else{
            return {
                commentId:item._id,
                liked:false
            }
        }

    })

    const disliked = allComments.map((item)=>{

        if(user.dislikes.filter((item1)=>item1.id==item._id).length>0){
            return {
                commentId:item._id,
                disliked:true
            }
        }else{
            return {
                commentId:item._id,
                disliked:false
            }
        }

    })

    const authors=await Promise.all(allComments.map(async (item)=>{

        const user=await User.findById(item.author)

        return user

    }))

    res.status(200).json({
        success:true,
        msg:"successfully retrieved",
        allComments,
        authors,
        likesNo:totalLike,
        dislikesNo:totalDislikes,
        userLiked:liked,
        userDisliked:disliked
    })

})
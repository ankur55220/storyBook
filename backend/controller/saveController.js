import mongoose from "mongoose";
import { Story} from "../model/Stories.js";
import { AsyncMiddleWare } from "../middleware/AsyncMiddleWare.js";
import {User} from "../model/User.js"

export const AddSave=AsyncMiddleWare(async(req,res,next)=>{


    const {postId,postBody,authorId}=req.body;

    const {id}=req.user;

    const loggedUser=await User.findById(id);
    
    const isPresent=loggedUser.Saved.find((item)=>(item.postId==postId));

    if(isPresent){
        res.status(500)
        throw new Error("already saved")
        return
    }

    const data={
        body:postBody,
        authorId,
        postId
    }

    loggedUser.Saved.push(data);

    await loggedUser.save();

    res.status(200).json({success:true,msg:"successfully saved"})

})


export const getAllSaved=AsyncMiddleWare(async(req,res,next)=>{

const {id}=req.user;

const loggedUser=await User.findById(id);

req.status(200).json({
    success:true,
    AllSaved:loggedUser.Saved
})




})

export const getSingleSaved=AsyncMiddleWare(async(req,res,next)=>{

const {id}=req.user;
const {postId}=req.body;

const loggedUser=await User.findById(id);

const getPost=loggedUser.Saved.filter((item)=>item.postId==postId)

if(getPost.length==0){
    res.status(404)
    throw new Error("no post found")
    return
}

res.status(200).json({
    success:true,
    post:getPost
})
})

export const deleteSaved=AsyncMiddleWare(async(req,res,next)=>{
    const {id}= req.user;

    const {postId}=req.body;

    const loggedUser=await User.findById(id);

    const getPost=loggedUser.Saved.filter((item)=>item.postId==postId)

if(getPost.length==0){
    res.status(404)
    throw new Error("no post found")
    return
}

loggedUser.Saved=loggedUser.Saved.filter((item)=>item.postId!=postId);

await loggedUser.save();

res.status(200).json({
    sucess:true,
    msg:"post deleted successsfully"
})

})



export const updateSave=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user;
    const {postId,postBody}=req.body;

    const loggedUser=await User.findById(id);

    const getPost=loggedUser.Saved.filter((item)=>item.postId==postId)

if(getPost.length==0){
    res.status(404)
    throw new Error("no post found")
    return
}

loggedUser.Saved=loggedUser.Saved.map((item)=>{

    if(item.postId==postId){

        item.body=postBody;

        return item;

    }else{
        return item;
    }
})

await loggedUser.save();

res.status(200).json({
    success:true,
    msg:"updated succesfully"
})

})
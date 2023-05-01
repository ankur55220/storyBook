import mongoose from "mongoose";
import { Audio} from "../model/Audio.js";
import { AsyncMiddleWare } from "../middleware/AsyncMiddleWare.js";
import {User} from "../model/User.js"
import ErrorClass from "../middleware/NewErrorClass.js";
import { Story } from "../model/Stories.js";


export const sendFalse=AsyncMiddleWare(async (req,res,next)=>{

  

  res.status(200).json({
      status:""
  })




})
export const AddNewAudio= AsyncMiddleWare(async (req,res,next)=>{

    const {body,url}=req.body;

    const {id}=req.user.user;

    const newAudio=await Audio.create({
       summary:body,
       author:id,
       audio:url
       
    })

    await newAudio.save();

    res.status(200).json({
        success:true,
        msg:"succesfully published",
        id:newAudio._id
    })




})


export const removeAudio=AsyncMiddleWare(async (req,res,next)=>{
    const {id}=req.body;

    const found= await Audio.findByIdAndDelete(id)

    if(!found){
        return next(new ErrorClass("something went wrong",404))
    }

    res.status(200).json({
        success:true,
        msg:"successfully removed"
    })

})

export const getAllAudios=AsyncMiddleWare(async (req,res,next)=>{
    
  const {id}=req.user.user


    const found= await Audio.find()


    const likesNo=found.map((item)=>item.likes)
    const dislikesNo=found.map((item)=>item.dislikes)

    const authors=await Promise.all(found.map(async(item)=>{
    const user=await User.findById(item.author)

    return user
    
    }))

    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();
    const user=await User.findById(id)
    const data={
      username:user.username,
      email:user.email,
      joined:user.createdAt,
      count:publishedCount
  }

  const logged=await User.findById(id)

  const liked = found.map((item)=>{

    if(logged.likes.filter((item1)=>item1.id==item._id).length>0){
        return true
    }else{
        return false
    }

})

const disliked = found.map((item)=>{

    if(logged.dislikes.filter((item1)=>item1.id==item._id).length>0){
        return true
    }else{
        return false
    }

})

    res.status(200).json({
        success:true,
        posts:found,
        authors,
        user:data,
        likesNo,
        dislikesNo,
        userLiked:liked,
        userDisliked:disliked
    })

})



export const getAllAudiosBy=AsyncMiddleWare(async (req,res,next)=>{
    
  const {id}=req.body

  const user=await User.findById(id)

  if(!id){
    return next(new ErrorClass("no such audio found",404))
  }
    const found= await Audio.find({author:id})

    const likesNo=found.map((item)=>item.likes)
    const dislikesNo=found.map((item)=>item.dislikes)

    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();
    const data={
      username:user.username,
      email:user.email,
      joined:user.createdAt,
      count:publishedCount
  }

  const logged=await User.findById(id)

  const liked = found.map((item)=>{

    if(logged.likes.filter((item1)=>item1.id==item._id).length>0){
        return true
    }else{
        return false
    }

})

const disliked = found.map((item)=>{

    if(logged.dislikes.filter((item1)=>item1.id==item._id).length>0){
        return true
    }else{
        return false
    }

})
    

    res.status(200).json({
        success:true,
        posts:found,
        authors:[user],
        user:data,
        likesNo,
        dislikesNo,
        userLiked:liked,
        userDisliked:disliked
    })

})


export const AddfavAudio=AsyncMiddleWare(async (req,res,next)=>{
    
    const {id}=req.user.user

    const {audId}=req.body

  
    if(!audId){
      return next(new ErrorClass("no such audio found",404))
    }
      const user=await User.findById(id)
      
      if(!user){
        return next(new ErrorClass("no such user found",404))
      }

      user.favAudio.push({audId:audId})

      await user.save()

      res.status(200).json({
        success:true
      })
  
      
  
     
  
  })


  export const RemovefavAudio=AsyncMiddleWare(async (req,res,next)=>{
    
    const {id}=req.user.user

    const {audId}=req.body

  
    if(!audId){
      return next(new ErrorClass("no such audio found",404))
    }
      const user=await User.findById(id)
      
      if(!user){
        return next(new ErrorClass("no such user found",404))
      }

      user.favAudio=user.favAudio.filter((item)=>item.audId!=audId)

      await user.save()

      res.status(200).json({
        success:true
      })
  
      
  
     
  
  })


  export const loginAudio=AsyncMiddleWare(async (req,res,next)=>{
    
    const {id}=req.user.user

    const user=await User.findById(id)

    if(!user){
      return next(new ErrorClass("no such user found",404))
    }

    const allAudios=await Audio.find({author:id})

    const likesNo=allAudios.map((item)=>item.likes)
    const dislikesNo=allAudios.map((item)=>item.dislikes)
 
 
 
    const liked = allAudios.map((item)=>{
 
     if(user.likes.filter((item1)=>item1.id==item._id).length>0){
         return true
     }else{
         return false
     }
 
 })
 
 const disliked = allAudios.map((item)=>{
 
     if(user.dislikes.filter((item1)=>item1.id==item._id).length>0){
         return true
     }else{
         return false
     }
 
 })
    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();
    const data={
      username:user.username,
      email:user.email,
      joined:user.createdAt,
      count:publishedCount
  }

    res.status(200).json({
      success:true,
      posts:allAudios,
      authors:[user],
      user:data,
      likesNo,
      dislikesNo,
      userLiked:liked,
      userDisliked:disliked
    })

  
    
     
  
  })


  export const getAllLoggedInFav=AsyncMiddleWare(async (req,res,next)=>{
    
    const {id}=req.user.user

    const user=await User.findById(id)

    if(!user){
      return next(new ErrorClass("no such user found",404))
    }

    const allAudios=await Promise.all(user.favAudio.map(async(item)=>{
      
          const foundAud=await Audio.findById(item.audId)

          return foundAud
    }))

   const likesNo=allAudios.map((item)=>item.likes)
   const dislikesNo=allAudios.map((item)=>item.dislikes)



   const liked = allAudios.map((item)=>{

    if(user.likes.filter((item1)=>item1.id==item._id).length>0){
        return true
    }else{
        return false
    }

})

const disliked = allAudios.map((item)=>{

    if(user.dislikes.filter((item1)=>item1.id==item._id).length>0){
        return true
    }else{
        return false
    }

})

    const authors=await Promise.all(allAudios.map(async(item)=>{

      const author=await User.findById(item.author)

      return author
    }))
    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();

    const data={
      username:user.username,
      email:user.email,
      joined:user.createdAt,
      count:publishedCount
  }

    res.status(200).json({
      success:true,
      posts:allAudios,
      authors,
      user:data,
      likesNo,
      dislikesNo,
      userLiked:liked,
      userDisliked:disliked
    })

  
    
     
  
  })

export const getSingleAudio=AsyncMiddleWare(async(req,res,next)=>{

  const {audioId}=req.body
  const {id}=req.user.user


  const audio=await Audio.findById(audioId)
const user=await User.findById(id)

const isFav=user.favAudio.filter((item)=>item.audId==audioId);
const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();

  if(!audio){
    return next(new ErrorClass("no such audio found",404))
  }


  const author=await User.findById(audio.author)

  const liked=user.likes.filter(item=>audioId)
  const disliked=user.dislikes.filter(item=>audioId)

  const data={
    username:user.username,
    email:user.email,
    joined:user.createdAt,
    count:publishedCount
}

  if(!user){
    return next(new ErrorClass("no user found",404))
  }


  res.status(200).json({
    success:true,
    posts:[audio],
    user:data,
    authors:[author],
    isFav:isFav.length>0,
    likes:[audio.likes],
    dislikes:[audio.dislikes],
    userLiked:[liked.length>0],
    userDisliked:[disliked.length>0]
  })

})
import mongoose from "mongoose";
import { Story} from "../model/Stories.js";
import { AsyncMiddleWare } from "../middleware/AsyncMiddleWare.js";
import {User} from "../model/User.js"
import {Comment} from "../model/Comment.js"
import ErrorClass from "../middleware/NewErrorClass.js";
import { DataArrayTwoTone } from "@mui/icons-material";
import { useRouteError } from "react-router-dom";
import { Audio } from "../model/Audio.js";

export const AddNewStory= AsyncMiddleWare(async (req,res,next)=>{

    const {body,format,status}=req.body;

    const {id}=req.user;

    const newStory=await new Story.create({
       body:body,
       author:id
    })

    await newStory.save();

    res.status(200).json({
        success:true,
        msg:"succesfully added"
    })




})


export const publishStory=AsyncMiddleWare(async(req,res,next)=>{

    const {id,summary}=req.body

    if(!summary){
        return next(new ErrorClass("feilds cannot be empty",401))
    }

    const story=await Story.findByIdAndUpdate(id,{$set:{summary:summary,status:"published"}})

    if(!story){
        return next(new ErrorClass("no such story Exists",404))
    }

    res.status(200).json({
        success:true,
        msg:"successfully published"
    })


})


export const markAsSeen=AsyncMiddleWare(async (req,res,next)=>{
    const {id}=req.user.user

    const {postId,index}=req.body

    console.log(id,"pppppppppppppppppppppp")
   if(!req.user.user){
       return next(new ErrorClass("You are not Logged In",401))
   }


   const user=await User.findById(id);


   console.log(index,user.notifications,"=======================55555555555555555555555555")
   const noti=user.notifications.findIndex((item)=>item._id==index)

//    console.log(user,postId,"------------->>>>>>>>>>>---888")

   
   user.notifications[noti].seen="yes"
    
   user.save()
   .then((item)=>{
    console.log(item)
   })
   .catch((err)=>{
    console.log(err,"111111111111111111111111")
   })
   

   res.status(200).json({
       success:true
      
   })
})

export const getUserId=AsyncMiddleWare(async (req,res,next)=>{
     const {id}=req.user.user


     console.log(id,"pppppppppppppppppppppp")
    if(!req.user.user){
        return next(new ErrorClass("You are not Logged In",401))
    }


    const user=await User.findById(id);

    if(!user){
        return next(new ErrorClass("You are not Logged In",401))

    }
    const noti=user.notifications.slice(0,11);
    const notiCount=noti.filter((item)=>item.seen=="no")

    res.status(200).json({
        success:true,
        id:req.user.user.id,
        notifications:noti,
        notiCount:notiCount.length
    })
})



// get stories start
export const getAllStory=AsyncMiddleWare(async(req,res,next)=>{

    const allStories=await Story.find({format:"script"});

    

    const authors=await Promise.all(allStories.map(async(item)=>{

        let user=await User.findById(item.author);

        return user.json();
    }))

    res.status(200).json({
        success:true,
        allStories,
        authors
    })

})

export const getAllpublishedStories=AsyncMiddleWare(async (req,res,next)=>{


    const {id}=req.user.user

    const user=await User.findById(id)
    const publishedStories= await Story.find({status:"published"})

    const likesNo=await publishedStories.map((item)=>item.likes)
    const dislikesNo=await publishedStories.map((item)=>item.dislikes)




     const authors=await Promise.all(publishedStories.map(async(item)=>{

        let user=await User.findById(item.author);
 
        
        return user;
    }))


    const liked = publishedStories.map((item)=>{

        if(user.likes.filter((item1)=>item1.id==item._id).length>0){
            return true
        }else{
            return false
        }

    })

    const disliked = publishedStories.map((item)=>{

        if(user.dislikes.filter((item1)=>item1.id==item._id).length>0){
            return true
        }else{
            return false
        }

    })

    console.log({
        success:true,
        posts:publishedStories,
        authors,
        likesNo,
        dislikesNo,
        userLiked:liked,
        userDisliked:disliked
    },"9990000pppppp")

    res.status(200).json({
        success:true,
        posts:publishedStories,
        authors,
        likesNo,
        dislikesNo,
        userLiked:liked,
        userDisliked:disliked
    })

})


export const getpublishedById=AsyncMiddleWare(async (req,res,next)=>{

    const loggedUser=req.user.user
    const {id}=req.body
    const publishedStories= await Story.find({$and:[{author:id},{status:"published"}]})

    const likesNo=publishedStories.map((item)=>item.likes)
    const dislikesNo=publishedStories.map((item)=>item.dislikes)

     const authors=await Promise.all(publishedStories.map(async(item)=>{

        let user=await User.findById(item.author);

        return user;
    }))

    const user=await User.findById(id)

    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();

    const data={
        username:user.username,
        email:user.email,
        joined:user.createdAt,
        count:publishedCount
    }


    console.log(loggedUser)

    const logged=await User.findById(loggedUser.id)

    const liked = publishedStories.map((item)=>{

        if(logged.likes.filter((item1)=>item1.id==item._id).length>0){
            return true
        }else{
            return false
        }

    })

    const disliked = publishedStories.map((item)=>{

        if(logged.dislikes.filter((item1)=>item1.id==item._id).length>0){
            return true
        }else{
            return false
        }

    })

    res.status(200).json({
        success:true,
        posts:publishedStories,
        authors,
        user:data,
        likesNo,
        dislikesNo,
        userLiked:liked,
        userDisliked:disliked
    })

})


export const addFavourite=AsyncMiddleWare(async (req,res,next)=>{

   const {id}=req.user.user

   const {summary,body,authorId,postId}=req.body

   if(!body || !postId){
    return next(new ErrorClass("something went wrong",500))
   }

   const user=await User.findById(id)

   if(!user){
    return next(new ErrorClass("no user found",404))
   }

   const found=user.Saved.filter((item)=>item.postId==postId)

   if(found.length>0){
    return next(new ErrorClass("you have already saved",404))
   }

   const data={
    summary,
    body,
    authorId,
    postId,
    bookmarks:[]


   }

   console.log(data,"================")
   user.Saved.push(data)

   await user.save()

   res.status(200).json({
    success:true
   })

})

export const getAllUnPublishedStories=AsyncMiddleWare(async (req,res,next)=>{

    const unPublishedStories= await Story.find({status:"unpublished"})

     const authors=await Promise.all(unPublishedStories.map(async(item)=>{

        let user=await User.findById(item.author);

        return user.json();
    }))

    res.status(200).json({
        success:true,
        unPublishedStories,authors
    })

})

export const AllStoriesByUser=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user;


    console.log(id)
    const user=await User.findById(id);
    if(!user){

        

        return next(new ErrorClass("User does not exists",404))
       
    }


    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();

    const data={
        username:user.username,
        email:user.email,
        joined:user.createdAt,
        count:publishedCount
    }

   


    const AllStories=await Story.find({$and:[{author:id},{status:"unpublished"},{isSaved:true}]});


    const likesNo=AllStories.map((item)=>item.likes)
    const dislikesNo=AllStories.map((item)=>item.dislikes)

    console.log(AllStories.length,"000007777777777777777777777")
    if(AllStories.length==0){

        res.status(200).json({
            success:true,
            posts:[],
            authors:[],
            user:data,
            likesNo,
            dislikesNo,
            userLiked:[],
            userDisliked:[]
        })

        return

    }
  
    const liked = AllStories.map((item)=>{

        if(user.likes.filter((item1)=>item1.id==item._id).length>0){
            return true
        }else{
            return false
        }

    })

    const disliked = AllStories.map((item)=>{

        if(user.dislikes.filter((item1)=>item1.id==item._id).length>0){
            return true
        }else{
            return false
        }

    })

    

    

    const data4={
        success:true,
        posts:AllStories,                      
        authors:[user],
        user:data,
        likesNo,
        dislikesNo,
        userLiked:liked,
        userDisliked:disliked

    }

    console.log(data4,"finalerrrrrrrrrrrrrrrrrrrrrrrrrr")

    res.status(200).json(data4)



})

export const storiesPublishedByUser=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user;


    console.log("reachin here",id)
    const user=await User.findById(id);
    if(!user){

        
        return next(new ErrorClass("User does not exists",404))
       
    }

    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();

    const data={
        username:user.username,
        email:user.email,
        joined:user.createdAt,
        count:publishedCount
    }

   

   


    const AllStories=await Story.find({$and:[{author:id},{status:"published"}]});

    const likesNo=AllStories.map((item)=>item.likes)
    const dislikesNo=AllStories.map((item)=>item.dislikes)


    const liked = AllStories.map((item)=>{

        if(user.likes.filter((item1)=>item1.id==item._id).length>0){
            return true
        }else{
            return false
        }

    })

    const disliked = AllStories.map((item)=>{

        if(user.dislikes.filter((item1)=>item1.id==item._id).length>0){
            return true
        }else{
            return false
        }

    })

console.log(AllStories,"==================================================================")

    res.status(200).json({
        success:true,
        posts:AllStories,
        authors:[user],
        user:data,
        likesNo,
        dislikesNo,
        userLiked:liked,
        userDisliked:disliked
    })


})


export const getAllFav=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user;
   console.log(req.user.user,"============")

   
    const user=await User.findById(id);
    if(!user){

        
        return next(new ErrorClass("User does not exists",404))
        
    }


    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();

    const data={
        username:user.username,
        email:user.email,
        joined:user.createdAt,
        count:publishedCount

    }


    console.log(user,"---------")

   

    const authors=await Promise.all(user.Saved.map(async(item)=>{

        let user=await User.findById(item.authorId);

        return user
    }))

    


    const liked = user.Saved.map((item)=>{

        if(user.likes.filter((item1)=>item1.id==item.postId).length>0){
            return true
        }else{
            return false
        }

    })

    const disliked = user.Saved.map((item)=>{

        if(user.dislikes.filter((item1)=>item1.id==item.postId).length>0){
            return true
        }else{
            return false
        }

    })


    const likesNo=await Promise.all(user.Saved.map(async(item)=>{

        let user2=await Story.findById(item.postId);

        return user2.likes
    }))

    const dislikesNo=await Promise.all(user.Saved.map(async(item)=>{

        let user3=await Story.findById(item.postId);

        return user3.dislikes
    }))

    res.status(200).json({
        success:true,
        posts:user.Saved,
        authors,
        user:data,
        likesNo,
        dislikesNo,
        userLiked:liked,
        userDisliked:disliked
        
    })

})

export const getSingleStory=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.body;

    const loggedUser=req.user.user
    const story=await Story.findById(id);

    if(!story){
        
        return next(new ErrorClass("no such story present",404))
         
    }

    const author=await User.findById(story.author);

    const user=await User.findById(loggedUser.id)



    const publishedCount=await Story.find({$and:[{author:id},{status:"published"}]}).count();

    const data={
        username:user.username,
        email:user.email,
        joined:user.createdAt,
        count:publishedCount

    }

    const found=user.Saved.filter((item)=>item.postId==id)
    const liked=user.likes.filter(item=>item.id==id)
    const disliked=user.dislikes.filter(item=>item.id==id)

     console.log(story)
    res.status(200).json({success:true,posts:[story],authors:[author],isFav:found.length>0,user:data,likes:[story.likes],dislikes:[story.dislikes],userLiked:[liked.length>0],userDisliked:[disliked.length>0]})

})

export const getSingleSave=AsyncMiddleWare(async(req,res,next)=>{
    const {id}=req.user.user

    const {postId,extraId}=req.body;
  

    console.log(postId,"0000")
    const user=await User.findById(id)

    if(!user){
        return next(new ErrorClass("no such user found",404))
    }

    const post=user.Saved.filter((item)=>item.postId==postId);
console.log(post,"00000000000000====================")
    if(post.length==0){
        return next(new ErrorClass("no favourite found",404))
    }

    res.status(200).json({
        success:true,
        post,
        
        authors:[user]
    })


})

export const addbookmark=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user

    const {postId,bookmarks}=req.body


    console.log(bookmarks,"=======>>>>>")

    if(!bookmarks){
        return next(new ErrorClass("something went wrong,couldn't ass bookmark",500))
    }

    const user=await User.findById(id)

    if(!user){
        return next(new ErrorClass("user was not found",404))
    }


    const index=user.Saved.findIndex((item)=>item.postId==postId)


    if(index==-1){
        return next(new ErrorClass("something went wrong",404))
    }

    user.Saved[index].bookmarks=bookmarks

   await user.save()




 


    res.status(200).json({
        sucess:true
    })


})


export const removeBookmark=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user

    const {postId,bookmarks}=req.body

    if(!bookmarks){
        return next(new ErrorClass("something went wrong,couldn't ass bookmark",500))
    }

    const user=await User.findById(id)

    if(!user){
        return next(new ErrorClass("user was not found",404))
    }


    const index=await user.Saved.findIndex((item)=>item.postId==postId)


    if(saved.length==0){
        return next(new ErrorClass("something went wrong",404))
    }

    user.Saved[index].bookmarks=bookmarks

   await user.save()

    res.status(200).json({
        sucess:true
    })


})



export const getAllBookMark=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user

    const {postId}=req.body

   

    const user=await User.findById(id)

    if(!user){
        return next(new ErrorClass("user was not found",404))
    }

    const allBookmarks=user.Saved.findIndex(item=>item.postId==postId);

    if(allBookmarks==-1){
        return next(new ErrorClass("no posts found",404))
    }

    res.status(200).json({
        sucess:true,
        bookmarks:user.Saved[allBookmarks].bookmarks
    })


})

export const getSingleBookMark=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user

    const {postId,docId}=req.body

   

    const user=await User.findById(id)

    if(!user){
        return next(new ErrorClass("user was not found",404))
    }

    const index=user.Saved.findIndex(item=>item.postId==postId);

   

    if(index==-1){
        return next(new ErrorClass("no posts found",404))
    }

    const data=user.Saved[index].bookmarks.filter(item=>item.id==docId)
    res.status(200).json({
        sucess:true,
        bookmark:data[0]
    })


})


export const updateFav=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user

    const {postId,body}=req.body

   

    const user=await User.findById(id)

    if(!user){
        return next(new ErrorClass("user was not found",404))
    }

    
    const index=user.Saved.findIndex(item=>item.postId==postId);

   console.log(user.Saved,postId)

    if(index==-1){
        return next(new ErrorClass("no posts found",404))
    }


    user.Saved[index].body=body

    await user.save()
    res.status(200).json({
        sucess:true
    })


})


export const editSave=AsyncMiddleWare(async(req,res,next)=>{
    const {title,body,genre}=req.body;
  console.log("working")
    if(!title || !body || !genre){

        return next(new ErrorClass("fields cant be empty",401))
    }



    const {id}=req.user.user

    const newStory= await Story.create({
        body,
        title,
        author:id,
        genre,
        isSaved:true,
        format:"script",
        status:"unpublished"

    })

    await newStory.save();

    res.status(200).json({
        success:true,
        msg:"successfully saved"
    })
})


export const deleteSave=AsyncMiddleWare(async(req,res,next)=>{
    const {id}=req.body;
  console.log("working")
    if(!id){

        return next(new ErrorClass("something went wrong",401))
    }



    

    const update=await Story.findByIdAndUpdate(id,{$set:{isSaved:false}})

    res.status(200).json({
        success:true,
        msg:"successfully deleted"
    })
})

// get stories ends


//update and delete starts


export const updateStory=AsyncMiddleWare(async(req,res,next)=>{

    const {storyId,storyBody}=req.body;
    const {id}=req.user.user;


    const story=await Story.findById(storyId);

    if(!story){

        return next(new ErrorClass("no such story present",404))
       
    }

    if(story.author!=id){
       
        return next(new ErrorClass("you dont have permission",404))
        
    }

    const updatedStory=await Story.findByIdAndUpdate(storyId,{body:{$set:storyBody}})

    res.status(200).json({success:true,updatedStory,msg:"updateSuccess"})




})


export const deleteStory=AsyncMiddleWare(async(req,res,next)=>{
 const {storyId,storyBody}=req.body;
    const {id}=req.user.user;


    const story=await Story.findById(storyId);

    if(!story){

        return next(new ErrorClass("no such story present",404))
       
        
    }

    if(story.author!=id){

        return next(new ErrorClass("you dont have permission",404))
       
    }

    const updatedStory=await Story.findByIdAndDelete(storyId)

    res.status(200).json({success:true,msg:"successfully deleted"})


})


export const updateedit=AsyncMiddleWare(async(req,res,next)=>{

    
    const {postId,title,body,genre}=req.body;

    if(!title || !body || !genre){

        return next(new ErrorClass("feilds cant be empty",401));
    }


    const updated=await Story.findByIdAndUpdate(postId,{$set:{title:title,body:body,genre:genre}})


    if(!updated){
        return next(new ErrorClass("no such post was found",404))
    }


    res.status(200).json({
        success:true,
        msg:"successsfully updated",
        posts:updated
    })


})

export const unPublishScript=AsyncMiddleWare(async(req,res,next)=>{

    
    const {id}=req.body;

    if(!id){

        return next(new ErrorClass("feilds cant be empty",401));
    }


    const updated=await Story.findByIdAndUpdate(id,{$set:{status:"unpublished"}})


    if(!updated){
        return next(new ErrorClass("no such post was found",404))
    }


    res.status(200).json({
        success:true,
        msg:"unpublished successful",
    
    })


})



export const removeScriptFromFavourite=AsyncMiddleWare(async(req,res,next)=>{

    
   const {id}=req.user.user
    const {postId}=req.body;

    if(!id || !postId){

        return next(new ErrorClass("feilds cant be empty",401));
    }


    const user =await User.findById(id)
    if(!user){
        return next(new ErrorClass("no such user found",404))
    }

    user.Saved=user.Saved.filter(item=>item.postId!=postId)


    await user.save()


    res.status(200).json({
        success:true,
        msg:"removed successfuly",
    
    })


})



export const unPublishAudio=AsyncMiddleWare(async(req,res,next)=>{

    
    const {id}=req.body;

    if(!id){

        return next(new ErrorClass("feilds cant be empty",401));
    }


    const updated=await Audio.findByIdAndDelete(id)


    if(!updated){
        return next(new ErrorClass("no such post was found",404))
    }


    res.status(200).json({
        success:true,
        msg:"unpublished successful",
        
    })


})


export const removeAudioFromFavourite=AsyncMiddleWare(async(req,res,next)=>{

    
    const {id}=req.user.user
     const {postId}=req.body;
 
     if(!id || !postId){
 
         return next(new ErrorClass("feilds cant be empty",401));
     }
 
 
     const user =await User.findById(id)
     if(!user){
         return next(new ErrorClass("no such user found",404))
     }
 
     user.favAudio=user.favAudio.filter(item=>item!=postId)
 
 
     
 await user.save()
 
     res.status(200).json({
         success:true,
         msg:"removed successful",
     
     })
 
 
 })


 export const getNamesAndId=AsyncMiddleWare(async(req,res,next)=>{

    

     const {name}=req.body;
 

    
     if(!name){
 
         return next(new ErrorClass("feilds cant be empty",401));
     }
 
 
     const user =await User.find({username:{$regex:"^"+name+""}})
     if(!user){
         return next(new ErrorClass("no such user found",404))
     }
 
     
     console.log(name,"======>>>>>>>>",user)
     res.status(200).json({
         success:true,
         msg:"removed successful",
         names:user
     
     })
 
 
 })



 export const AddNotification=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user

    const {type,postid,data,audid}=req.body;
 

    console.log(type,postid,data,audid)
    const usersToBeNotified=await Promise.all(data.map(async(item,index)=>{

        let user=await User.findById(item.data.userid)

        return user
    }))


    console.log(usersToBeNotified,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjooooooooooooooo")

    if(type=="audios"){

        const data={
            format:"audios",
            postid,
            seen:"no",
            audid
        }

        const saved=await usersToBeNotified.map(async(item)=>{
         
            item.notifications.unshift(data)

            await item.save()

            return 1
        })

        res.status(200).json({
            success:true,
            msg:"sent notification"
        })
    

        return


    }else if(type=="scripts"){
        const data={
            format:"scripts",
            postid,
            seen:"no",
            audid:""
        }

        const saved= await Promise.all(usersToBeNotified.map(async(item)=>{
            console.log(item,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

            item.notifications.unshift(data)

            await item.save()

            

            return 1
        }))

        res.status(200).json({
            success:true,
            msg:"sent notification"
        })
    

        return


    }

   

})


export const AddAudioNotify=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user

    const {postid,audid}=req.body;

   
    const author=await User.findById(id)

    const userToBeNotified=author.Saved.filter((item)=>item.postId==postid)



    console.log(userToBeNotified[0],postid,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    // const data={
    //     format:"audiosNoti",
    //     audid,
    //     postid,
    //     seen:"no",
       
        
    // }

    const user=await User.findByIdAndUpdate(userToBeNotified[0].authorId,{$push:{
        notifications:{
            $each:[{
                format:"audiosNoti",
                audid,
                postid,
                seen:"no",
               
                
            }],
            $position:0
        }
    }})
    

    

//     user.notifications.unshift(data)


// await user.save()

    res.status(200).json({
        sucess:true,
        msg:"notification sent"
    })
   

   

})


// export const AddLikes=AsyncMiddleWare(async(req,res,next)=>{

//     const {id}=req.user.user

//     const {postid,form,postType}=req.body;
    

//     const user=await User.findById(id)

//     const likes=user.likes.filter((item)=>item.id==postid)
//     const dislikes=user.dislikes.filter((item)=>item.id==postid)
    

//     console.log(postid,form,postType,likes,dislikes,"++++++++++++++++++++++++++")
//     const handleLikes=async (type)=>{

//         if(likes.length==0 && dislikes.length==0){

//             console.log("audios","LLLLLLLLLLLLLLLLLLLL")
//             if(type=="audios"){

//                 if(form=="like"){
//                     const updated = await User.findByIdAndUpdate(id,{$push:{
//                         likes:{id:postid}
                        
//                      }},{new:true})
     

//                      console.log(updated,"plzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
//                      const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
//                      console.log(audioupdate,"audios","LLLLLLLLLL00000LLLLLLLLLL")
//                 }else if (form=="dislike"){

//                     const updated = await User.findByIdAndUpdate(id,{$push:{
//                         dislikes:{id:postid}
                        
//                      }},{new:true})
     
//                      const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

//                 }

                



//             }else if (type=="scripts"){


//                 if(form=="like"){

//                     User.findByIdAndUpdate(id,{new:true},{"$push":{
//                         likes:{id:postid}
                        
//                      }})
//                      .then((res)=>{consoleo.log(res)})
//                      .catch((err)=>{

//                      })
     
//                      const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
                    
   
//                 }else if(form=="dislike"){

//                     const updated = await User.findByIdAndUpdate(id,{$push:{
//                         dislikes:{id:postid}
                        
//                      }},{new:true})
     
//                      const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

//                 }
                
        
        
                
//             }else if(type=="comments"){

                

//             if(form=="like"){
//                 const updated = await User.findByIdAndUpdate(id,{$push:{
//                     likes:{id:postid}
//                     }
//                  },{new:true})
 
//                  const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})

//             }else if(form=="dislike"){
//                 const updated = await User.findByIdAndUpdate(id,{$push:{
//                     dislikes:{id:postid}
//                     }
//                  },{new:true})
 
//                  const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})


//             }
                
 

               
//             }

            
//         }else if(likes.length>0){

            
//            if(form=="like"){


//             if(type=="audios"){

              
//                 const updated = await User.findOneAndUpdate(id,{$pull:{
//                     likes:{id:postid}
                    
//                  }},{new:true})

         
    

        
//             const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
        

          




//             }else if (type=="scripts"){
        
//                 const updated = await User.findOneAndUpdate(id,{$pull:{
//                     likes:{id:postid}
                    
//                  }},{new:true})

         
    

        
//             const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
        
        
                
//             }else if(type=="comments"){
        
        

//                 const updated = await User.findOneAndUpdate(id,{$pull:{
//                     likes:{id:postid}
                    
//                  }},{new:true})

         
    

        
//             const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
        
        
//             }
             




//            }else if(form=="dislike"){



//             if(type=="audios"){
//                 const updated = await User.findByIdAndUpdate(id,{$pull:{
//                     likes:{id:postid}
                    
//                  }},{new:true})


//                  const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                     dislikes:{id:postid}
                    
//                  }},{new:true})



//            const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
//            const audioupdate2=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

            
           





        




//             }else if (type=="scripts"){
//                 const updated = await User.findByIdAndUpdate(id,{$pull:{
//                     likes:{id:postid}
                    
//                  }},{new:true})










//                  console.log(id,"000000000999999998888888")
//                 User.findByIdAndUpdate(id,{$push:{
//                     dislikes:{id:postid}
//                  }},{new:true})
//                  .then((res)=>{
//                     console.log(res,"000000000)))")
//                  })
//                  .catch((err)=>{
//                     console.log(err,"-iiiiiiii")
//                  })


                 



//            const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
//            const audioupdate2=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})


        
        
//             }else if (type=="comments"){
               
//                 const updated = await User.findByIdAndUpdate(id,{$pull:{
//                     likes:{id:postid}
                    
//                  }},{new:true})


//                  const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                     dislikes:{id:postid}
                    
//                  }},{new:true})



//            const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
//            const audioupdate2=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})


//             }

//            }


         


            



//         }else if(dislikes.length>0){


//             if(form=="like"){


//                 if(type=="audios"){


//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
                        
//                      }},{new:true})
    
    
//                      const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                         likes:{id:postid}
                        
//                      }},{new:true})

                     
    
    
//                const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
//                const audioupdate2=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})





//                 }else if (type=="scripts"){


//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
//                      }},{new:true})
    
    
//                      const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                         likes:{id:postid}
                        
//                      }},{new:true})

                     
//     console.log("kkkkkkkkkkkkkkkkkkkk[",postid)
    
//                const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
//                const audioupdate2=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
            
                    
            
                    
//                 }else if(type=="comments"){

                    
//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
//                      }},{new:true})
    
    
//                      const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                         likes:{id:postid}
                        
//                      }},{new:true})

                     
    
    
//                const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
//                const audioupdate2=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
            
            
//                 }



//             }else if(form=="dislike"){


//                 if(type=="audios"){


//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
//                      }},{new:true})
    
             
        
    
            
//                 const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
    



//                 }else if (type=="scripts"){
            
//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
                        
//                      }},{new:true})
    
             
        
    
            
//                 const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
            
                    
//                 }else if(type=="comments"){

//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
//                      }},{new:true})
    
             
        
    
            
//                 const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
            
            
            
//                 }

//             }





//         }

//     }

    

   

//     handleLikes(postType)


//     res.status(200).json({
//         success:true,
//         msg:'successfully appreciated',
//         postType
//     })







   
   
   

   

// })



export const AddLikes=AsyncMiddleWare(async(req,res,next)=>{

    const {id}=req.user.user

    const {postid,form,postType}=req.body;
    

    const user=await User.findById(id)

    const likes=user.likes.filter((item)=>item.id==postid)
    const dislikes=user.dislikes.filter((item)=>item.id==postid)
    

    console.log(postid,form,postType,likes,dislikes,"++++++++++++++++++++++++++")
    

        if(likes.length==0 && dislikes.length==0){

            console.log("audios","LLLLLLLLLLLLLLLLLLLL")
            if(postType=="audios"){

                if(form=="like"){
                    const updated = await User.findByIdAndUpdate(id,{$push:{
                        likes:{id:postid}
                        
                     }},{new:true})
     

                     console.log(updated,"plzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
                     const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
                     console.log(audioupdate,"audios","LLLLLLLLLL00000LLLLLLLLLL")
                }else if (form=="dislike"){

                    const updated = await User.findByIdAndUpdate(id,{$push:{
                        dislikes:{id:postid}
                        
                     }},{new:true})
     
                     const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

                }

                



            }else if (postType=="scripts"){


                if(form=="like"){

                 const updated=await User.findByIdAndUpdate(id,{$push:{
                        likes:{id:postid}
                        
                     }},{new:true})
                     
     
                     const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
                    
   
                }else if(form=="dislike"){

                    const updated = await User.findByIdAndUpdate(id,{$push:{
                        dislikes:{id:postid}
                        
                     }},{new:true})
     
                     const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

                }
                
        
        
                
            }else if(postType=="comments"){

                

            if(form=="like"){
                const updated = await User.findByIdAndUpdate(id,{$push:{
                    likes:{id:postid}
                    }
                 },{new:true})
 
                 const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})

            }else if(form=="dislike"){
                const updated = await User.findByIdAndUpdate(id,{$push:{
                    dislikes:{id:postid}
                    }
                 },{new:true})
 
                 const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})


            }
                
 

               
            }

            
        }else if(likes.length>0){

            
           if(form=="like"){


            if(postType=="audios"){

              
                const updated = await User.findOneAndUpdate(id,{$pull:{
                    likes:{id:postid}
                    
                 }},{new:true})

         
    

        
            const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
        

          




            }else if (postType=="scripts"){
        
                const updated = await User.findByIdAndUpdate(id,{$pull:{
                    likes:{id:postid}
                    
                 }},{new:true})

         
    

        
            const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
        
        
                
            }else if(postType=="comments"){
        
        

                const updated = await User.findByIdAndUpdate(id,{$pull:{
                    likes:{id:postid}
                    
                 }},{new:true})

         
    

        
            const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
        
        
            }
             




           }else if(form=="dislike"){



            if(postType=="audios"){
                const updated = await User.findByIdAndUpdate(id,{$pull:{
                    likes:{id:postid}
                    
                 }},{new:true})


                 const updated2 = await User.findByIdAndUpdate(id,{$push:{
                    dislikes:{id:postid}
                    
                 }},{new:true})



           const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
           const audioupdate2=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

            
           





        




            }else if (postType=="scripts"){
                const updated = await User.findByIdAndUpdate(id,{$pull:{
                    likes:{id:postid}
                    
                 }},{new:true})










                 console.log(id,"000000000999999998888888")
            const updated2= await User.findByIdAndUpdate(id,{$push:{
                    dislikes:{id:postid}
                 }},{new:true})
                 


                 



           const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
           const audioupdate2=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})


        
        
            }else if (postType=="comments"){
               
                const updated = await User.findByIdAndUpdate(id,{$pull:{
                    likes:{id:postid}
                    
                 }},{new:true})


                 const updated2 = await User.findByIdAndUpdate(id,{$push:{
                    dislikes:{id:postid}
                    
                 }},{new:true})



           const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
           const audioupdate2=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})


            }

           }


         


            



        }else if(dislikes.length>0){


            if(form=="like"){


                if(postType=="audios"){


                    const updated = await User.findByIdAndUpdate(id,{$pull:{
                        dislikes:{id:postid}
                        
                     }},{new:true})
    
    
                     const updated2 = await User.findByIdAndUpdate(id,{$push:{
                        likes:{id:postid}
                        
                     }},{new:true})

                     
    
    
               const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
               const audioupdate2=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})





                }else if (postType=="scripts"){


                    const updated = await User.findByIdAndUpdate(id,{$pull:{
                        dislikes:{id:postid}
                     }},{new:true})
    
    
                     const updated2 = await User.findByIdAndUpdate(id,{$push:{
                        likes:{id:postid}
                        
                     }},{new:true})

                     
    console.log("kkkkkkkkkkkkkkkkkkkk[",postid)
    
               const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
               const audioupdate2=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
            
                    
            
                    
                }else if(postType=="comments"){

                    
                    const updated = await User.findByIdAndUpdate(id,{$pull:{
                        dislikes:{id:postid}
                     }},{new:true})
    
    
                     const updated2 = await User.findByIdAndUpdate(id,{$push:{
                        likes:{id:postid}
                        
                     }},{new:true})

                     
    
    
               const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
               const audioupdate2=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
            
            
                }



            }else if(form=="dislike"){


                if(postType=="audios"){


                    const updated = await User.findByIdAndUpdate(id,{$pull:{
                        dislikes:{id:postid}
                     }},{new:true})
    
             
        
    
            
                const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
    



                }else if (postType=="scripts"){
            
                    const updated = await User.findByIdAndUpdate(id,{$pull:{
                        dislikes:{id:postid}
                        
                     }},{new:true})
    
             
        
    
            
                const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
            
                    
                }else if(postType=="comments"){

                    const updated = await User.findByIdAndUpdate(id,{$pull:{
                        dislikes:{id:postid}
                     }},{new:true})
    
             
        
    
            
                const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})
            
            
            
                }

            }





        }

    

    

   



    res.status(200).json({
        success:true,
        msg:'successfully appreciated',
        postType
    })







   
   
   

   

})



 
//update and delete ends
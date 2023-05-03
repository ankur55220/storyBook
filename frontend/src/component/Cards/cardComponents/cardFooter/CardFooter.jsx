import React,{useState} from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import styled from 'styled-components';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useSelector,useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import { useNavigate } from 'react-router-dom';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { AddFavourite,AddFavouriteAudio,AddLikes} from '../../../../store/editor-slice';
import {deleteSave} from '../../../../store/user-slice'
import { getMyPosts } from '../../../../store/user-slice';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { removeAudioFav,removeScriptFav } from '../../../../store/user-slice';
import { getSingleData,getSingleAudio,RemoveFavouriteAudio,updateLikeStatus } from '../../../../store/editor-slice';
import { addReply } from '../../../../store/comment-slice';
import { changeLikeStatus } from '../../../../store/editor-slice';
import { useEffect } from 'react';
const CardFooterWrapper=styled.div`
     width:100%;
     padding:0rem 0.5rem;
     margin-bottom:2rem;
     margin-left:${props=>props.type?"1.5rem":"0"};

    
    `
function CardFooter({summary,postFormat,pos,type,postId,userId,body,postType,likes,dislikes,isFav,authId,comId,isLiked,isDisliked}) {

  const user=useSelector(state=>state.users)
  const editors=useSelector(state=>state.editor)
  const navigate=useNavigate()
  const dispatch=useDispatch()
const [currId,setCurrId]=React.useState(false)

const [reply,setReply]=React.useState("")

  const clickHandler=(card)=>{
    if(card=="save"){
      return navigate(`/updateEdit/${postId}`)
    }else if(card=="Fav"){
      return navigate(`/record/${postId}`)
    }
    



  }

  
  


  const handleReply=()=>{

    const data={
      body:reply,
      comId,
      postId

    }
    console.log(data)

    dispatch(addReply(data))

  }


  const moreHandler=()=>{
      console.log(postType,"ggggggggggggggg")
    if(postType=="audios"){
      return navigate(`/Audio/${postId}`)
    }else{
      return navigate(`/Post/${postId}`)
    }
    
  }


  const addfav=()=>{


  console.log(postType,"sssssssssssssssssssssss")

    if(postType && postType=="audios"){

      const data={
        audId:postId
      }
  dispatch(AddFavouriteAudio(data))
  dispatch(getSingleAudio({audioId:postId}))
    }else{

      const data={
        summary,
        body,
        authorId:userId,
        postId
  
      }
  

      console.log(data,"8888888888888888")
      dispatch(AddFavourite(data))
        dispatch(getSingleData({id:postId}))

    }
   

  }

  const removefav=()=>{




    if(postType && postType=="audios"){

      const data={
        audId:postId
      }


      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk99999")
  dispatch(RemoveFavouriteAudio(data))

  dispatch(getSingleAudio({audioId:postId}))

    }else{

      const data={
        postId
  
      }
  

      console.log(data,"8888888888888888")
      dispatch(removeScriptFav(data))
      dispatch(getSingleData({id:postId}))

    }
   

  }


  const deleteHandler=()=>{

    const data={id:postId}


    dispatch(deleteSave(data))
    dispatch(getMyPosts(data))


  }


  const [trigger,setTrigger]=useState(false)

  const replyHandler=()=>{



    setCurrId(!currId)
  }
    
   const likeHandler=()=>{

    const data={
      postid:postType=="comments"?comId:postId,
      form:"like",
      postType


    }

    

    dispatch(AddLikes(data))
      .then(()=>{console.log("i am dispatched")})
    


   }

   const unlikeHandler=()=>{

    const data={
      postid:postType=="comments"?comId:postId,
      form:"dislike",
      postType


    }
    
    console.log(data,postId,"insideunlike")
    dispatch(AddLikes(data))
    .then(()=>{console.log("i am dispatched")})
    
   }

//    useEffect(()=>{

// console.log(editors.msg)
//     if(editors.msg=="successfully appreciated"){
//       dispatch(updateLikeStatus("dislike"))
//       console.log("useEffect77","ppppppppppppppppuuuuuuuuuuuuuuuuuuuuuuuuuu")

//     }

//    },[editors.msg])


  return (
    <CardFooterWrapper type={type}>





      {
        user.save=="save"?<>
        <DeleteIcon style={{marginRight:"0.5rem",color:"#587b7f",cursor:"pointer"}} onClick={deleteHandler}/>
        <EditAttributesIcon style={{marginRight:"1rem",color:"#587b7f",cursor:"pointer"}} onClick={()=>{clickHandler("save")}}/>
        
        </>:
        <>

       <span style={{color:"#587b7f"}}>{likes}</span>< ThumbUpIcon style={{marginRight:"0.5rem",color:isLiked?"green":"#587b7f",cursor:"pointer"}} onClick={()=>{likeHandler()}}/>
       <span style={{color:"#587b7f"}}>{dislikes}</span><ThumbDownIcon style={{marginRight:"1rem",color:isDisliked?"green":"#587b7f",cursor:"pointer"}} onClick={()=>{unlikeHandler()}} />

       {
        type=="comment"?<span style={{color:"#587b7f",cursor:"pointer"}} onClick={replyHandler}>{"reply"}</span>  :<span style={{color:"#587b7f"}} onClick={moreHandler}>{"more"}</span>
       }
       
       {
        isFav?<KeyboardVoiceIcon style={{marginLeft:"0.5rem",color:"#587b7f",cursor:"pointer"}} onClick={()=>{clickHandler("Fav")}}/>:null
       }

{
  type=="comment" && currId?<><span>&nbsp;&nbsp;<input onChange={(e)=>{setReply(e.target.value)}} type="text" /></span> <span><button onClick={handleReply}>post</button></span></>:null
}
       


        </>
      }
       {
        pos && !editors.backendEditdata.isFav && user.userId!=authId?
        <BookmarkAddIcon style={{marginLeft:"1rem",color:"#587b7f",cursor:"pointer"}} onClick={addfav}/>:

        pos && editors.backendEditdata.isFav && user.userId!=authId?
        <BookmarkRemoveIcon style={{marginLeft:"1rem",color:"#587b7f",cursor:"pointer"}} onClick={removefav}/>:
        null
       }



    </CardFooterWrapper>
  )
}

export default CardFooter
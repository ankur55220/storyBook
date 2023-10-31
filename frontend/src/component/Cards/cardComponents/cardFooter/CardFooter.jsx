import React,{useState,useCallback} from 'react'
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
import { CircularProgress, Tooltip } from '@mui/material';
 import { url } from '../../../../url';
 import axios from "axios"
 import { AllComments } from '../../../../store/comment-slice';

 import UseLocalStorage from '../../../../hooks/UseLocalStorage';
import { render } from 'react-dom';
const CardFooterWrapper=styled.div`
     width:100%;
     padding:0rem 0.5rem;
     margin-bottom:2rem;
     margin-left:${props=>props.type?"1.5rem":"0"};

    
    `
function CardFooter({fromPost,summary,postFormat,pos,type,postId,userId,body,postType,likes,dislikes,isFav,authId,comId,isLiked,isDisliked}) {
 console.log("back again")
  const {setLoggedInUser,getLoggedInUser}=UseLocalStorage();

  const user=useSelector(state=>state.users)
  const editors=useSelector(state=>state.editor)
  const navigate=useNavigate()
  const dispatch=useDispatch()
const [currId,setCurrId]=React.useState(false)
const [likeInfo,setLikeInfo]=useState(false)
const [reply,setReply]=React.useState("")
const [info,setRender]=React.useState(0)


const [data,setData]=useState("")

  const clickHandler=(card)=>{
    if(card=="save" && postId){
      return navigate(`/updateEdit/${postId}`)
    }else if(card=="Fav" && fromPost){
      return navigate(`/record/${fromPost}`)
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
    .then(()=> dispatch(AllComments({postId})))
   

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
  .then(()=>{dispatch(getSingleAudio({audioId:postId}))})
  
    }else{

      const data={
        summary,
        body,
        authorId:userId,
        postId
  
      }
  

      console.log(data,"8888888888888888")
      dispatch(AddFavourite(data))
      .then(()=>{dispatch(getSingleData({id:postId}))})
        

    }
   

  }

  const removefav=()=>{




    if(postType && postType=="audios"){

      const data={
        audId:postId
      }


      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk99999")
  dispatch(RemoveFavouriteAudio(data))
  .then(()=>dispatch(getSingleAudio({audioId:postId})))

  

    }else{

      const data={
        postId
  
      }
  

      console.log(data,"8888888888888888")
      dispatch(removeScriptFav(data))
      .then(()=>{ dispatch(getSingleData({id:postId}))})
     

    }
   

  }


  const deleteHandler=()=>{

    const data={id:postId}


    dispatch(deleteSave(data))
    .then(()=>{dispatch(getMyPosts(data))})
    


  }


  const [trigger,setTrigger]=useState(false)

  const replyHandler=()=>{



    setCurrId(!currId)
  }



  useEffect(()=>{

    

      const fun=async()=>{

   
        const details={
          postid:postType=="comments"?comId:postId,
           type:postType
    
    
        }
  
             console.log(details,"look here")
        setLikeInfo(true)
  
    
        const token=getLoggedInUser();
        const myPosts=await axios.post(`${url}/likedAndNumbers`,details,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })    
  
        console.log(myPosts.data)
        setData(myPosts.data)
  
        setLikeInfo(false)
  
      }

      if(postId || comId){
        fun();
      }
      
    },[postId,comId])
   

  
    
    



  
    
  
    const likeHandler=async()=>{

      try{

        const details={
          postid:postType=="comments"?comId:postId,
          form:"like",
          postType
    
    
        }
  
       
        setLikeInfo(true)
  
    
        const token=getLoggedInUser();
        const myPosts=await axios.post(`${url}/AddLikes`,details,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })    
    
        // console.log(myPosts.data)
        setLikeInfo(false)
        console.log("kkkkkkkkkkkkkkk")
      }
      catch(err){
        console.log(err,"dekhte hain")
      }

     


     
      // dispatch(AddLikes(data))
      //   .then(()=>{console.log("i am dispatched")})
      
  
  
     }

     

  
   

  useEffect(()=>{

    const details= async()=>{

      let data={
        type:postType,
        postid:postType=="comments"?comId:postId,
      }
      const token=getLoggedInUser();


      setLikeInfo(true)
      const argu=await axios.post(`${url}/likedAndNumbers`,data,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      })

      console.log(argu.data,"finallll")
      setData(argu.data)
      setLikeInfo(false)

    }
   
    if(info>0){
      details()
    }
    


  },[info])

  

    const unlikeHandler=async()=>{

      const data={
        postid:postType=="comments"?comId:postId,
        form:"dislike",
        postType
  
  
      }
        
      setLikeInfo(true)
      const token=getLoggedInUser();
      const myPosts=await axios.post(`${url}/AddLikes`,data,{
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })    
          
      setLikeInfo(false)
      // console.log(data,postId,"insideunlike")
      // dispatch(AddLikes(data))
      // .then(()=>{console.log("i am dispatched")})
      
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


   <button onClick={()=>{console.log(postId)}}>click abhi</button>


      {
        user.save=="save"?<>

        <Tooltip title="Delete the scripy">
        <DeleteIcon style={{marginRight:"0.5rem",color:"#587b7f",cursor:"pointer"}} onClick={deleteHandler}/>
   
        </Tooltip>

        <Tooltip title="Edit the script">
        <EditAttributesIcon style={{marginRight:"1rem",color:"#587b7f",cursor:"pointer"}} onClick={()=>{clickHandler("save")}}/>

        </Tooltip>
        
        </>:
        <>
         
        {
          likeInfo?<CircularProgress size="2rem"/>:<>
          <span style={{color:"#587b7f"}}>{data.totalLikes}</span>< ThumbUpIcon style={{marginRight:"0.5rem",color:data.presentLike?"green":"#587b7f",cursor:"pointer"}} onClick={()=>{likeHandler().then(()=>{setRender(no=>no+1)})}}/>
          <span style={{color:"#587b7f"}}>{data.totlaDisLikes}</span><ThumbDownIcon style={{marginRight:"1rem",color:data.presentDislike?"green":"#587b7f",cursor:"pointer"}} onClick={()=>{unlikeHandler().then(()=>{setRender(no=>no+1)})}} />
          
          </>
        }

       

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
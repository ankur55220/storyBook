import React,{useEffect,useState} from 'react'
import { PageWrapper } from '../../universal'
import styled from 'styled-components'
import Card from '../../component/Cards/Card'
import { changeSaveToFav, getSingleData } from '../../store/editor-slice'
import Comments from '../../component/Comments/Comments'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSelect } from '@mui/base'
import { CircularProgress } from '@mui/material'
import { getSingleAudio,changeNavTrigger } from '../../store/editor-slice'
import { getMyId } from '../../store/user-slice'
import { useLocation } from 'react-router-dom'
import { changeSeen } from '../../store/editor-slice'
import {Alert} from '@mui/material'
const PageWrapperWithFlexStart=styled(PageWrapper)`
    
align-items:flex-start;
`

const PostWrapper=styled.div`
 
margin:auto;
width:80%;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
padding-top:3rem;

`

function Audio() {

   const dispatch=useDispatch()

   const editdata=useSelector((state)=>state.editor)
   const location=useLocation()
  const {id}=useParams();
  useEffect(()=>{

    dispatch(getSingleAudio({audioId:id}))
    // dispatch(getMyId())
    dispatch(changeNavTrigger())
    dispatch(changeSaveToFav())
    // dispatch(updateLikeStatus(""))

  },[])


  useEffect(()=>{
    console.log(location)
    if(id && location.state && location.state.index){

      dispatch(changeSeen({postId:id,index:location.state.index}))
      
      

    }
    },[id])


    useEffect(()=>{


      if(editdata.navTrigger){
        dispatch(getMyId())

      }
    },[editdata.navTrigger])

  useEffect(()=>{
    if(editdata.likeStatus!=""){
      dispatch(getSingleAudio({audioId:id}))
    }
  },[editdata.likeStatus])

  const [err,setErr]=useState(true)
  const [right,setRight]=useState(false)

  useEffect(()=>{
    let timeout;
if(editdata.msg!=""){
  setRight(true)
  timeout=setTimeout(()=>{
     setRight(false)
  },2000)

}


if(editdata.err!=""){
  setErr(true)
  timeout=setTimeout(()=>{
    setErr(false)
  },2000)

}
    

  },[editdata.msg,editdata.err])
   
   
  return (
    <PageWrapperWithFlexStart>

{
          setRight?<Alert severity="success">{editdata.msg}</Alert>:
          setErr?<Alert severity="error">{editdata.err}</Alert>:
          null
        }

        <PostWrapper>
   {
    editdata.loading?<CircularProgress />: 
    <Card  
    postType="audios" 
    user={editdata.backendEditdata.user} 
    posts={editdata.backendEditdata.posts} 
    authors={editdata.backendEditdata.authors}  
    likesNo={editdata.backendEditdata.likes}
  dislikesNo={editdata.backendEditdata.dislikes}
  userLiked={editdata.backendEditdata.userLiked}
  userDisliked={editdata.backendEditdata.userDisliked}
    name={editdata?.backendEditdata?.user?.username}
    state={editdata?.backendEditdata?.state}
    bg="white" 
    rad="10px" 
    post="post" 
    img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>
   }

{
  editdata.backendEditdata.state?null:editdata.backendEditdata.posts?<audio src={editdata.backendEditdata.posts[0].audio} controls/> :<CircularProgress/>
}

          
           <Comments mt="1.5rem" state={editdata.backendEditdata.state} comType="audios" postId={id}/>
           

        </PostWrapper>
        
        
    </PageWrapperWithFlexStart>
  )
}

export default Audio
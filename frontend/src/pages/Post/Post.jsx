import React,{useEffect} from 'react'
import { PageWrapper } from '../../universal'
import styled from 'styled-components'
import Card from '../../component/Cards/Card'
import { getSingleData,changeSaveToFav,changeNavTrigger,getFalse } from '../../store/editor-slice'
import Comments from '../../component/Comments/Comments'
import { useSelector,useDispatch } from 'react-redux'
import { useParams,useLocation } from 'react-router-dom'
import { useSelect } from '@mui/base'
import { CircularProgress } from '@mui/material'
import Alert from '@mui/material/Alert';

import { getMyId } from '../../store/user-slice'

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

function Post() {

   const dispatch=useDispatch()

   const editdata=useSelector((state)=>state.editor)

  const {id}=useParams();
  const location=useLocation()

  // useEffect(()=>{
  //   if(editdata.navTrigger){

  //     console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  //     dispatch(getMyId())

  //   }
  //   },[editdata.navTrigger])



  useEffect(()=>{
   console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    dispatch(getSingleData({id}))

     .then(()=> dispatch(changeNavTrigger()))
     .then(()=> dispatch(changeSaveToFav()))
   
   
    


  },[])


  useEffect(()=>{

    console.log("useEffect2")
    console.log(location)
    if(id && location && location.state && location.state.index){

      dispatch(changeSeen({postId:id,index:location.state.index}))
      
      

    }
    },[id])


    useEffect(()=>{

      console.log("useEffect3")
      if(editdata.navTrigger){
        dispatch(getMyId())

      }
    },[editdata.navTrigger])

  useEffect(()=>{
    console.log("useEffect4")
    if(editdata.typeOfPost!=""){
      dispatch(getSingleData({id}))
       .then(()=>dispatch(getFalse()))
    }
  
  },[editdata.typeOfPost])


  const [err,setErr]=React.useState(true)
  const [right,setRight]=React.useState(false)
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

    <>{
      editdata.loading?<CircularProgress/>:


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
  isFav={editdata.backendEditdata.isFav} 
  noMenu="noMenu" 
  user={editdata.backendEditdata.user} 
  posts={editdata.backendEditdata.posts} 
  authors={editdata.backendEditdata.authors} 
  likesNo={editdata.backendEditdata.likes}
  dislikesNo={editdata.backendEditdata.dislikes}
  userLiked={editdata.backendEditdata.userLiked}
  userDisliked={editdata.backendEditdata.userDisliked}

  postType="scripts"
  name={editdata.backendEditdata.user?.username}
  bg="white" 
  rad="10px" 
  post="post" 
  img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  />
  }


        
         <Comments comType="script" postId={id}/>
         

      </PostWrapper>
      
      
  </PageWrapperWithFlexStart>
    }
    
    </>
   
  )
}

export default Post
import React,{useEffect} from 'react'
import { PageWrapper } from '../../universal'
import styled from 'styled-components'
import Sidebar from '../../component/Sidebar/Sidebar'
import Container from '../../component/Container/Container'
import { getMyFav } from '../../store/user-slice'
import {useSelector,useDispatch} from 'react-redux'
import { getPublishedById,getAllAudiosbyUser } from '../../store/user-slice'
import { useNavigate, useParams,useLocation } from 'react-router-dom'
import { updateLikeStatus } from '../../store/comment-slice'
import { getFalse } from '../../store/editor-slice'
const PageWrapperFullScreen=styled(PageWrapper)`
height:90vh;
overflow-y:auto;
align-items:flex-start;
justify-content:flex-start;
background-color:#ffff;
`
function Othersprofile() {
  const loggedUser=useSelector(state=>state.users);
  const editinfo=useSelector(state=>state.editor)
  const comm=useSelector(state=>state.comment)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {id}=useParams()
  const location=useLocation()
    
  if(id==location.state.loggedId){
   navigate("/profile")

  }

  useEffect(()=>{
    console.log("jjjjj000000")
    const dummy={
      dummy:"dummy"
    }
    
    if(location.state && location.state.loggedId && id!=location.state.loggedId){
      dispatch(getPublishedById({id}))
      // dispatch(updateLikeStatus(""))

    }

   

  },[])

  useEffect(()=>{


    console.log(editinfo,"pppppppppppppppppp",location)
    if(editinfo.active=="scripts" && (location.state && location.state.loggedId && id!=location.state.loggedId) ){
      dispatch(getPublishedById({id}))

    }else if(editinfo.active=="audios" && (location.state && location.state.loggedId && id!=location.state.loggedId)){
      console.log(editinfo.active,"pppppppppppppppppp")

      dispatch(getAllAudiosbyUser({id}))
    }

  },[editinfo.active])



  useEffect(()=>{
    if(editinfo.typeOfPost!=""){
      if(editinfo.active=="scripts" && (location.state && location.state.loggedId && id!=location.state.loggedId) ){
        dispatch(getPublishedById({id}))
        .then(()=>dispatch(getFalse()))
  
      }else if(editinfo.active=="audios" && (location.state && location.state.loggedId && id!=location.state.loggedId)){
        dispatch(getAllAudiosbyUser({id}))
         .then(()=>dispatch(getFalse()))
      }

    }
    

  },[editinfo.typeOfPost])
  



  // useEffect(()=>{

  //   if(loggedUser && loggedUser.userId!="" && loggedUser!="you need to login first" && loggedUser.userId.id==id){
  //     navigate("/profile")

  //   }

  // },[loggedUser.userId])

  return (
    <PageWrapperFullScreen>
        <Sidebar type="Othersprofile" loading={loggedUser.loading} error={loggedUser.err} user={loggedUser.loggedInUser.user}/>
        <Container 
        postType={editinfo.active} 
        typeOf="Othersprofile" 
        loading={loggedUser.loading} 
        error={loggedUser.err} 
        posts={loggedUser.loggedInUser.posts} 
        authors={loggedUser.loggedInUser.posts} 
        
        user={loggedUser.loggedInUser.user}
        likesNo={loggedUser.loggedInUser.likesNo}
        dislikesNo={loggedUser.loggedInUser.dislikesNo}
        userLiked={loggedUser.loggedInUser.userLiked}
        userDisliked={loggedUser.loggedInUser.userDisliked}
      />

    </PageWrapperFullScreen>
  )
}

export default Othersprofile
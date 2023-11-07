import React,{useEffect} from 'react'
import { PageWrapper } from '../../universal'
import styled from 'styled-components'
import Sidebar from '../../component/Sidebar/Sidebar'
import Container from '../../component/Container/Container'
import { getMyFav } from '../../store/user-slice'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PageWrapperFullScreen=styled(PageWrapper)`
height:90vh;
overflow-y:auto;
align-items:flex-start;
justify-content:flex-start;
background-color:#ffff;
`
function Profile() {
  const loggedUser=useSelector(state=>state.users);
  const StoryData=useSelector(state=>state.editor)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    console.log("jjjjj000000")
    const dummy={
      dummy:"dummy"
    }
    dispatch(getMyFav(dummy))
   

  },[])


  useEffect(()=>{

    console.log(loggedUser)
    if(loggedUser.userId=="you need to login first"){
      navigate("/")
    }

  },[loggedUser.userId])




  return (
    <PageWrapperFullScreen>
      
      {/* <button onClick={()=>{console.log(loggedUser)}}>clickk faaast</button> */}

         <Sidebar type="profile" loading={loggedUser.loading} error={loggedUser.err} user={loggedUser.loggedInUser.user}/>

        <Container 
        
        postType={StoryData.active} 
        loading={loggedUser.loading} 
        error={loggedUser.err} 
        posts={loggedUser.loggedInUser.posts} 
        authors={loggedUser.loggedInUser.authors} 
        user={loggedUser.loggedInUser.user}
        likesNo={loggedUser.loggedInUser.likesNo}
        dislikesNo={loggedUser.loggedInUser.dislikesNo}
        userLiked={loggedUser.loggedInUser.userLiked}
        userDisliked={loggedUser.loggedInUser.userDisliked}
        
        
        />
      
       


    </PageWrapperFullScreen>
  )
}

export default Profile
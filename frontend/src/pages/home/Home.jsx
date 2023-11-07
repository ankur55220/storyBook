import React from 'react'
import { PageWrapper } from '../../universal'
import styled from 'styled-components'
import Sidebar from '../../component/Sidebar/Sidebar'
import Container from '../../component/Container/Container'
import { useSelector,useDispatch } from 'react-redux'
import { getAllPublished,getAllaudio} from '../../store/editor-slice'
import { useEffect } from 'react'
import { updateLikeStatus } from '../../store/comment-slice'
import { changeLikeStatus } from '../../store/editor-slice'

import { getMyId,makeSaveNeutral } from '../../store/user-slice'
import { useState } from 'react'
import { getFalse } from '../../store/editor-slice'

const PageWrapperFullScreen=styled(PageWrapper)`
min-height:90vh;
overflow-y:auto;
align-items:flex-start;
justify-content:flex-start;
background-color:#ffff;
`


function Home() {


const StoryData=useSelector(state=>state.editor)
const dispatch=useDispatch()
useEffect(()=>{
  console.log("sdjashgdj====")
  
dispatch(getAllPublished("hey"))
.then(()=>{dispatch(getMyId())} )
.then(()=>dispatch(makeSaveNeutral()))
  
},[])


useEffect(()=>{

  console.log(StoryData)

  if(StoryData.active=="scripts"){
    dispatch(getAllPublished("hooo"))
    
    
  }else if(StoryData.active=="audios"){
    dispatch(getAllaudio())
    
    

  }
  console.log(StoryData.active)

},[StoryData.active])

useEffect(()=>{

  if(StoryData.typeOfPost=="scripts"){
    dispatch(getAllPublished("third"))
    .then(()=>dispatch(getFalse()))
    .then(()=>{console.log("working")})

  }else if(StoryData.typeOfPost=="audios"){
    dispatch(getAllaudio())
    .then(()=>dispatch(getFalse()))
    .then(()=>{console.log("working")})
  }


},[StoryData.typeOfPost])




const [trigger,setTrigger]=useState(false)



useEffect(()=>{

  if(StoryData.active=="scripts" && StoryData.likeStatus){

    console.log("useEffect5")
    dispatch(getAllPublished())
    setTrigger(true)


  }else if(StoryData.active=="audios" && StoryData.likeStatus){
   

    dispatch(getAllaudio())
    setTrigger(true)

  }

},[StoryData.likeStatus])


useEffect(()=>{

  if(trigger){
    dispatch(changeLikeStatus(false))
     setTrigger(false)
  }

},[trigger])



  return (
    <>
   
    <PageWrapperFullScreen>

      
    
        <Sidebar />
        <Container 
        type="Home" 
        postType={StoryData.active} 
        loading={StoryData.loading} 
        posts={StoryData.homeData.posts} 
        authors={StoryData.homeData.authors}
        likesNo={StoryData.homeData.likesNo}
        dislikesNo={StoryData.homeData.dislikesNo}
        userLiked={StoryData.homeData.userLiked}
        userDisliked={StoryData.homeData.userDisliked}

        
        />


    </PageWrapperFullScreen>

    </>
  )
}

export default Home
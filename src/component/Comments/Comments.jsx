import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import CustomInput from '../input/CustomInput'
import CustomButton from '../Buttons/CustomButton'
import Comment from './CommentComponents/comment'

import comments from './dummyData'


import UseForm from '../input/CustomInput'
import { AddComments } from '../../store/comment-slice'
import { useDispatch,useSelector } from 'react-redux'
import { AllComments } from '../../store/comment-slice'
import { CircularProgress } from '@mui/material'
import { InsertEmoticonRounded } from '@mui/icons-material'
import { getFalse } from '../../store/editor-slice'
const CommentWrapper=styled.div`
width:100%;
min-height:50vh;
background-color:#ffff;
padding:0.2rem 1rem;
font-family:Lato, sans-serif;
margin-top:${props=>props.mt?props.mt:"0px"}
`

const PostCommentBox=styled.div`
width:100%;
display:flex;
justify-content:flex-start;
align-items:center;
`


function Comments({mt,comType,postId}) {

   const dispatch=useDispatch()
  const [value,Form,setValue]=UseForm({
    width:"60%",
    padding:"0.5rem 1.5rem",
    placeholder:"write your comment here"
})
    
const parents=useSelector(state=>state.comment)
const editor=useSelector(state=>state.editor)


const [com,setCom]=useState([])
const AddComment=()=>{

  const data={
    body:value,
    postId

  }

  dispatch(AddComments(data))

}

    // const parents=comments.filter((item)=>item.parent==-1)

    useEffect(()=>{

      dispatch(AllComments({postId}))

    },[])


    useEffect(()=>{

       if(editor.typeOfPost!=""){
        dispatch(AllComments({postId}))
         .then(()=>dispatch(getFalse()))
       }
      

    },[editor.typeOfPost])


    
  return (
    <CommentWrapper mt={mt}>


      <button onClick={()=>{console.log(editor)}}>click me</button>
        <PostCommentBox>
           {Form}
           <CustomButton content="post" width="10%" left="1rem" padding="0.5rem 0.2rem" translate="-4.5px" fun={AddComment}/>
        </PostCommentBox>
        
        {
          parents.loading?<CircularProgress/>:
          <Comment 
          parents={parents.comments.allComments.filter(item=>item.parent=="-1")} 
          authors={parents.comments.authors}
          comlikes={parents.comments.likesNo}
          comdislikes={parents.comments.dislikesNo}
          comisLiked={parents.comments.userLiked}
          comisDisliked={parents.comments.userDisliked}
          />

        }
    </CommentWrapper>
  )
}

export default Comments
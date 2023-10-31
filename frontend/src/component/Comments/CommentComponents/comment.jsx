import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

import CardHead from '../../Cards/cardComponents/cardHead/CardHead'
import CardFooter from '../../Cards/cardComponents/cardFooter/CardFooter'
import comments from '../dummyData'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'


function Comment({child,parents,authors,comlikes,comdislikes,comisLiked,comisDisliked}) {

const CommentWrapper=styled.div`

width:100%;
margin-left:${child?"1.5rem":"0"};

`

const CommentBody=styled.div`
 width:100%;
 padding-left:2rem;
 margin-bottom:1rem


`



const [data,setData]=useState([])

const [img,setImg]=useState("")
const [name,setName]=useState("")
const comments=useSelector((state)=>state.comment.comments.allComments)

const comData=useSelector((state)=>state.comment)

const findChildren=(id)=>{

    const curr=comments.filter((item)=>item.parent==id)
  
    console.log(curr,"------------->>>>>>>",parents,id)
    return curr



}


const findAuthor=(itemId,itemType)=>{
    if(itemType=="img"){
        const img=authors.filter((item)=>item._id==itemId)[0].profilePic
        console.log(img,"ggghhhh")

        return img
    }else if(itemType=="name"){
        const name=authors.filter((item)=>item._id==itemId)[0].username

        return name
        
    }


}


  return (

    <>
{
   authors && parents && parents.length>0 && parents.map((item)=>{
      
        console.log(item)

        return (
<>
            <CommentWrapper>

        <CardHead type="comment"  createdOn={item.createdAt} align="flex-start" img={findAuthor(item.author,"img")} name={findAuthor(item.author,"name")}/>
        
        <CommentBody>
            {item.body}
            
        </CommentBody>
        <CardFooter 
        type="comment" 
        postType="comments"
        comId={item._id} 
        postId={item.postId} 
        likes={comlikes.filter((res)=>res.commentId==item._id)[0].like}
        dislikes={comdislikes.filter((res)=>res.commentId==item._id)[0].dislike}
        isLiked={comisLiked.filter((res)=>res.commentId==item._id)[0].liked}
        isDisliked={comisDisliked.filter((res)=>res.commentId==item._id)[0].disliked}
        />

        {
        findChildren(item._id).length>0 && 
        <Comment 
        child="child" 
        parents={findChildren(item._id)} 
        authors={authors} 
        comlikes={comData.comments.likesNo}
        comdislikes={comData.comments.dislikesNo}
        comisLiked={comData.comments.userLiked}
        comisDisliked={comData.comments.userDisliked}
        
        />
    }
    </CommentWrapper>
    
    
</>

        )
    })


}
    
    

    </>
  )
}

export default Comment
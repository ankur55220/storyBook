import React,{useEffect} from 'react'
import styled from 'styled-components'
import CardHead from './cardComponents/cardHead/CardHead'
import CardTitle from './cardComponents/cardTitle/CardTitle'
import CardBody from './cardComponents/cardBody/CardBody'
import CardFooter from './cardComponents/cardFooter/CardFooter'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'

const CardWrapper=styled.div`
    
     width:100%;
     border-bottom:1px solid #D3D3D3;
     font-family: Lato, sans-serif;
     margin-bottom:1.2rem;
     padding:0 1.2rem;
     background-color:${props=>props.bg?props.bg:"none"};
     border-radius:${props=>props.rad?props.rad:""};

    `
function Card({postFormat,bg,rad,post,img,name,posts,authors,user,postType,noMenu,isFav,audId,likesNo,dislikesNo,userLiked,userDisliked}) {


  console.log(posts,user)
  const usersInfo=useSelector((state)=>state.users)
    

  useEffect(()=>{

    console.log(posts)
  },[posts])



 
  return (

    

    <>

    {

posts && posts.length>0?
      
posts.map((item,idx)=>{

        console.log(posts.length)
        console.log(item,"here")
        console.log(postType && usersInfo.save=="Fav" && postType!="audios")

        console.log(postType,usersInfo.save)

        // authors && authors.length==1 && authors._id==user._id
        if(typeof(item)!="undefined" && authors && authors.length==1){
          return (
            <CardWrapper bg={bg} rad={rad}>
          <CardHead 
          postType={postType} 
          noMenu={noMenu} 
          text={usersInfo.save} 
          img={img} 
          name={authors[0].username} 
          audId={usersInfo.save!="save" && postType=="audios"?item._id:undefined} 
          postId={usersInfo.save=="Fav" && postType!="audios"?item.postId:item._id} 
          userId={authors[0]._id}/>
          {
            usersInfo.save=="save"? <CardTitle title={item.title}/>:<CardBody body={item.summary} />
            
          }
         
          
          <CardFooter 
          isFav={isFav} 
          postFormat={postFormat} 
          noMenu={noMenu} 
          text={usersInfo.save} 
          postType={postType} 
          pos={post?post:""} 
           body={item.body}
           postId={usersInfo.save=="Fav" && postType!="audios"?item.postId:item._id} 
           authId={item.author}
           userId={authors[0]._id}
           likes={likesNo[idx]}
           dislikes={dislikesNo[idx]}
           isLiked={userLiked[idx]}
           isDisliked={userDisliked[idx]}
           summary={item.summary}
           />
          </CardWrapper>

)


        }else{

          return (
            <CardWrapper bg={bg} rad={rad}>
          <CardHead 
          postType={postType} 
          noMenu={noMenu} 
          text={usersInfo.save} 
          img={img} 
          name={authors[idx].username} 
          audId={usersInfo.save=="Fav" && postType=="audios"?item._id:undefined} 
          postId={usersInfo.save=="Fav" && postType!="audio"?item.postId:item._id} 
          userId={authors[idx]._id}/>
          {
            usersInfo.save=="save" ? <CardTitle title={item.title}/>:<CardBody body={item.summary}  />
          }
          
          <CardFooter 
          isFav={isFav} 
          
          postFormat={postFormat} 
          noMenu={noMenu} 
          text={usersInfo.save} 
          postType={postType} 
          pos={post?post:""} 
          postId={usersInfo.save=="Fav" && postType!="audios"?item.postId:item._id} 
          userId={authors[idx]._id} 
          body={item.body}
          likes={likesNo[idx]}
           dislikes={dislikesNo[idx]}
           isLiked={userLiked[idx]}
           isDisliked={userDisliked[idx]}
           summary={item.summary}
          />
          </CardWrapper>

)

        }
        
        
        
        


   
      }):
      <h2>"no post yet"</h2>
    }
    
    </>
  )
}

export default Card
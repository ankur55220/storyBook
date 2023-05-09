import React,{useEffect} from 'react'
import styled from 'styled-components'
import Title from '../title/Title'
import Card from '../Cards/Card'
import { CircularProgress } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllaudio } from '../../store/editor-slice'
import { changeActive } from '../../store/editor-slice'
import { getMyAudio,getMyFavAudio } from '../../store/user-slice'
import { getMyPublished,getMyFav } from '../../store/user-slice'
import { updateLikeStatus } from '../../store/editor-slice'
import { getAllPublished } from '../../store/editor-slice'
import { getFalse } from '../../store/editor-slice'

const Container2=styled.div`
    
width:${props=>props.width?props.width:"60%"};

margin-left:7rem;

@media (max-width: 768px) {
    width:95%;
    margin-left:0;
    margin:auto;
  }
`

const ContainerBody=styled.div`
width:100%;
background-color:#ffff;
font-family:Lato, sans-serif;
border-radius:10px;


`

const ShortMsg=styled.div`
width:100%;
background-color:#ffff;
font-family:Lato, sans-serif;
border-radius:10px;
margin-bottom:1.5rem;
padding:1rem;
color:#778899;
margin-right:1rem;




`
function Container({width,loading,error,posts,authors,user,type,postType,typeOf,likesNo,dislikesNo,userLiked,userDisliked}) {


  const details=useSelector(state=>state.users)
  const editInfo=useSelector(state=>state.editor)
  const dispatch=useDispatch()

useEffect(()=>{

  console.log(loading,error,posts,authors,user,"klkkwj")

},[error,posts,authors,user])

const [postType1, setPostType1] = React.useState('scripts');

const handleChange = (event) => {

  
  console.log("77777000000",event.target.value)
  setPostType1(event.target.value)
  dispatch(changeActive(event.target.value))
  



  0
};


useEffect(()=>{

  const dummy={
    dummy:"dummy"
  }


  console.log("useEffect1","oooooooooooooooooooooooo")

  if(!typeOf && typeOf!="Othersprofile" && editInfo.active=="audios" && details.save=="Fav"){
    dispatch(getMyFavAudio())
  }else if(!typeOf && typeOf!="Othersprofile" && editInfo.active=="audios" && details.save=="published"){
    dispatch(getMyAudio())
  }else if(!typeOf && typeOf!="Othersprofile" && editInfo.active=="scripts" && details.save=="Fav"){
     dispatch(getMyFav(dummy))
  }else if(!typeOf && typeOf!="Othersprofile" && editInfo.active=="scripts" && details.save=="published"){
    dispatch(getMyPublished(dummy))
  }



},[editInfo.active])


// useEffect(()=>{
// if(details.save=="Fav" || details.save=="published"){
//   setPostType1("scripts")
// }
// },[details.save])



useEffect(()=>{
  const dummy={
    dummy:"dummy"
  }

  if(editInfo.typeOfPost!="" && editInfo.loading==false){
  console.log("hereree",editInfo.typeOfPost)

    if(!typeOf && typeOf!="Othersprofile" && editInfo.active=="audios" && details.save=="Fav" ){
      dispatch(getMyFavAudio())
      .then(()=>dispatch(getFalse()))
    }else if(!typeOf && typeOf!="Othersprofile" && editInfo.active=="audios" && details.save=="published"){

      console.log("herereeaudio")

      dispatch(getMyAudio())
      .then(()=>dispatch(getFalse()))
    }else if(!typeOf && typeOf!="Othersprofile" && editInfo.active=="scripts" && details.save=="Fav"){
       dispatch(getMyFav(dummy))
       .then(dispatch(getFalse()))
    }else if(!typeOf && typeOf!="Othersprofile" && editInfo.active=="scripts" && details.save=="published"){
      dispatch(getMyPublished(dummy))
      .then(()=>dispatch(getFalse()))
    }

  }

 
  
  },[editInfo.typeOfPost])
  return (
    <Container2 width={width}>
        <Title title="Latest Posts"/>

       


       <ContainerBody>
       <ShortMsg>
          {

          
            details.save=="save"?"It stores all the unfinished and unpublished ongoing sripts by the uesr":
            details.save=="Fav"?"All favourited scripts can be recorded an audio to publish it click on publish arrrow":
            details.save=="published"?"here you will find all the published scripts and audios by user":
            null
            
          }
        </ShortMsg>

        {
          type=="Home" || details.save=="published" || details.save=="Fav" || editInfo.active=="audios"?
          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Post</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={postType1}
          label="post"
          onChange={handleChange}
        >
          <MenuItem value="scripts">Scripts</MenuItem>
          <MenuItem value="audios">Audios</MenuItem>

        </Select>
      </FormControl>
    </Box>:null
        }

        {
          details.loading?<CircularProgress />:
          
          posts && posts.length==0?<h1>No post to show yet</h1>:
          
          loading?"loading...":
          <Card 
          postType={postType} 
          posts={posts} 
          authors={authors} 
          user={user}
          likesNo={likesNo}
          dislikesNo={dislikesNo}
          userLiked={userLiked}
          userDisliked={userDisliked}


          />
        }
           
            
        </ContainerBody>
        
    </Container2>
  )
}

export default Container
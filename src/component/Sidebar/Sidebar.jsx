import React,{useEffect,useState} from 'react'
import styled from "styled-components"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import NotesIcon from '@mui/icons-material/Notes';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyPublished,getMyPosts,getMyFav} from '../../store/user-slice';
import { changeActive } from '../../store/editor-slice';
import { getFalse } from '../../store/editor-slice';

const ProfilePic=({user})=>{

  const style={

    display:"flex",
    alignItems:"center",
    justifyContent:"flex-start",
    marginBottom:"1.2rem"
  }

  const right_profile={
    marginLeft:"1.5rem"
  }

  const pro_i={
    display:"flex",
    width:"100%",
    alignItems:"center",
    justifyContent:"flex-start",
    
  }

  const img_pro={
    width:"100%",
    height:"100%"
  }

  console.log(user,"kjkjjlkljl")
  return (


    <div className="profile" style={style}>
    <div className="left_profile">
        <img style={img_pro} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" className="img_pro" />
    </div>
    <div className="right_profile" style={right_profile}>
      <div className="pro_name">
        {user?.username}
      </div>
      <div className="pro_i" style={pro_i}>
        <div className="info" style={{width:"50%",fontSize:"0.5rem"}}>Published&nbsp;&nbsp;{user?.count}</div>
        <div className="info" style={{width:"50%",fontSize:"0.5rem",whiteSpace:"nowrap"}}>Joined&nbsp;&nbsp;{new Date(user?.joined).toLocaleDateString()}</div>
      </div>
    </div>
  </div>

  )
}

  const SideBar=styled.div`
  
  background-color:#1976d2;
  color:#ffff;

  font-size:1rem;
  font-weight:bold;
  height:90vh;
  width:20%;
  position:sticky;
  top:0;
  left:0;
  @media (max-width: 768px) {
    width:100%
  }
  
  `
  const SideBarBody=styled.div`
  width:80%;
  margin:auto;
  height:100%;
  padding-top:3rem;
  padding-bottom:1.5rem;
  display:flex;
  flex-direction:column;
  align-items:space-between;
  justify-content:space-between;
  @media (max-width: 768px) {
    flex-direction: row;
  }
  
  
  `

  const MenuItem=styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  cursor:pointer;
  margin-bottom:1rem;
  
  
  `

  const FirstMenuItem=styled(MenuItem)`
    margin-bottom:1rem;
  `

  const Footer=styled.div`
  paddingLeft:7%;
  display:flex;
  justify-content:flex-start;
  alignItems:center;
  cursor:pointer;
  
  `

const ProfileMenu=({typeOf})=>{

const dispatch=useDispatch();
const navigate=useNavigate()

const [proType,setProtype]=useState("fav")

const comm=useSelector((item)=>item.editor)

useEffect(()=>{
  // dispatch(updateLikeStatus(""))

},[])
const clickHandler=(type)=>{

  setProtype(type)

  console.log(type,"====================")
  const dummy={
    dummy:"dummy"
  }
  if(type=="write"){
    return navigate("/edit")
  }else if(type=="published"){

    
    dispatch(getMyPublished(dummy))
    .then(()=>dispatch(getFalse()))
    .then(()=>dispatch(changeActive("scripts")))
   
    
  }else if(type=="fav"){
   

    dispatch(getMyFav(dummy))
    .then(()=>dispatch(getFalse()))
    .then(()=>dispatch(changeActive("scripts")))
    
  }else if(type=="save"){
    

    dispatch(getMyPosts(dummy))
    .then(()=>dispatch(getFalse()))
    .then(()=>dispatch(changeActive("scripts")))
  }

}




  return (
<>

{
  typeOf=="Othersprofile"?<MenuItem onClick={()=>{clickHandler("published")}}>
  <PublishedWithChangesIcon />&nbsp;&nbsp;&nbsp;published posts
</MenuItem>:
<>
<FirstMenuItem onClick={()=>{clickHandler("write")}}>
        <NotesIcon/>&nbsp;&nbsp;&nbsp;Write Script
    </FirstMenuItem>
    <MenuItem onClick={()=>{clickHandler("published")}}>
        <PublishedWithChangesIcon />&nbsp;&nbsp;&nbsp;published posts
    </MenuItem>
    <MenuItem onClick={()=>{clickHandler("fav")}}>
        <FavoriteIcon />&nbsp;&nbsp;&nbsp;Favourite posts
    </MenuItem>
    <MenuItem onClick={()=>{clickHandler("save")}}>
        <BookIcon />&nbsp;&nbsp;&nbsp;My posts
    </MenuItem>

</>

}
    
    </>

  )
}
function Sidebar({type,loading,error,user}) {


  

  useEffect(()=>{

    console.log(loading,error,user,"pppppppp")
  },[loading,error,user])
  return (
    <SideBar>
        <SideBarBody>

                                                                                                                                                 

          <div className="upper_bar">

         {                                                                                                                                                               
          type && loading? <CircularProgress/> :
          
          type && !loading?<ProfilePic user={user}/>:null
         }

         {
          type?<ProfileMenu typeOf={type}/>:<>
           <FirstMenuItem>
                <AccountBoxIcon/>&nbsp;&nbsp;&nbsp;My Profile
            </FirstMenuItem>
              
          
          </>
         }
             
             
          </div>


          <Footer>
             <LogoutIcon />&nbsp;&nbsp;&nbsp;Logout
          </Footer>


        </SideBarBody>

        
    </SideBar>
  )
}

export default Sidebar
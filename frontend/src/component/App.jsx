import React from 'react'
import Reader from './editorBox/Reader'
import Editor from './editorBox/Editor'
import Navbar from './navbar/Navbar'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import Post from '../pages/Post/Post'
import Profile from '../pages/profile/Profile'
import { Routes,Route,Router } from 'react-router-dom'
import Edit from '../pages/EditPage/Edit'
import EditStory from '../pages/Editing/EditStory'

import Read from '../pages/ReadScript/Read'
import Othersprofile from '../pages/OtherUserProfile/Othersprofile'
import Audio from '../pages/Audio/Audio'
import Publish from '../pages/publish/Publish'

function app() {

  
  return (
    <>

    <Navbar />
    
     <Routes>
       <Route path="/" element={<Login />}/>
       <Route path="/signup" element={<Signup />}/>
       <Route path="/home" element={<Home />}/>
       <Route path="/profile" element={<Profile />}/>
       <Route path="/edit" element={<Edit />}/>
       <Route path="/updateEdit/:id" element={<EditStory />}/>
       <Route path="/record/:id" element={<Reader />} />
       <Route path="/publish/:id" element={<Publish />} />
       <Route path="/Post/:id" element={<Post />} />
       <Route path="/user/:id" element={<Othersprofile />} />
       <Route path="/Audio/:id" element={<Audio />} />



       
     </Routes>
     
      {/* <Editor address="https://www.google.com"/> */}
      {/* <Editor /> */}
      
    

    </>
  )
}

export default app
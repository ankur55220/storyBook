import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getSingleData } from '../../store/editor-slice';
import { useDispatch,useSelector } from 'react-redux';
import Editor1 from '../../component/editorBox/Editor';
import { CircularProgress } from '@mui/material';
function Publish() {

    const {id}=useParams();
   const dispatch=useDispatch()
    const editor=useSelector((state)=>state.editor)

    useEffect(()=>{
      console.log(id,"here")
        if(id){
          dispatch(getSingleData({id}))
        }
       

    },[id])
  return (
    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}}>
   <button onClick={()=>{console.log(editor.backendEditdata.posts[0])}}>click here</button>
        {
            editor.loading  && !Array.isArray(editor.backendEditdata.posts) ?<CircularProgress/>:


            <Editor1 content={Array.isArray(editor.backendEditdata.posts)?editor.backendEditdata.posts[0].body:""} type="readOnly"/>
        }
      
        
    </div>
  )
}

export default Publish
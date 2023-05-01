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

        dispatch(getSingleData({id}))

    },[])
  return (
    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}}>

        {
            editor.loading?<CircularProgress/>:
            <Editor1 content={editor.backendEditdata.posts[0].body} type="readOnly"/>
        }
        
        
    </div>
  )
}

export default Publish
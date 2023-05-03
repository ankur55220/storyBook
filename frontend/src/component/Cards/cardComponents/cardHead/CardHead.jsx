import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Tooltip from '@mui/material/Tooltip';
import PublishIcon from '@mui/icons-material/Publish';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Editor1 from '../../../editorBox/Editor';
import UseForm from '../../../input/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { publishStory } from '../../../../store/editor-slice';
import { useNavigate } from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import { AddNewAud,resetAudid } from '../../../../store/audio-slice';
import {getMyId, unPublishAudio,unPublishScript } from '../../../../store/user-slice';
import { getMyPublished,getMyAudio } from '../../../../store/user-slice';
import { AddNotify,changeNavTrigger,AddaudioNotify } from '../../../../store/editor-slice';
import Alert from '@mui/material/Alert';

const HeadWrapper = styled.div`
    width: 100%;
    height: 5vh;
    display: flex;
    justify-content:${props=>props.align?props.align:"space-between"};
    align-items: center;
    padding: 0.2rem 0.5rem;
    object-fit: cover;
    margin-bottom:1.5rem;
  `;

  const ProfilePic = styled.div`
    box-shadow:1px 2px rgba(0,0,0,0.75)
    border-radius:50%;
    width:1.5rem;
    height:1.5rem;
    cursor:pointer;
    

    `;

  const ProfileName = styled.div`
    
    margin-left:${props=>props.type?"0.5rem":"0.2"};
    cursor:pointer;

  `;

function CardHead({type,align,img,name,postId,userId,text,noMenu,postType,audId}) {

  const [open,setOpen]=useState(false)

  const [trigger,setTrigger] = useState(true)

  const navigate=useNavigate()
  
  const handleClose=()=>{
    setOpen(!open)
  }

  const [open2,setOpen2]=useState(false)
  
  const handleClose2=()=>{
    setOpen2(!open2)
  }

  const EditorData=useSelector(state=>state.editor)
  const AudioUrl=useSelector(state=>state.audio.audioUrl)
  const  audid=useSelector((state)=>state.audio.audId)
  const logged=useSelector((state)=>state.users)
   const dispatch=useDispatch()


   const handleNotifications=(proType)=>{
    if(!EditorData.editorData){
      alert("feild cant be empty")
      return
    }


    console.log(proType,"@@@@@@@@@@@@@@@@@@@@@@@@")
    const editData=JSON.parse(EditorData.editorData)

    const data=Object.keys(editData.entityMap)
    // const linkDatas=data.map((item)=>JSON.parse(EditorData.editorData).entityMap[`${item}`].data.type=="tag")
     
    const linkDatas=data.filter((item)=>editData.entityMap[`${item}`].data.type=="tag")

    const allTags=linkDatas.map((item)=>editData.entityMap[`${item}`])



   
    

    if(proType=="audios"){
      const val={
        type:proType,
        postid:postId,
        data:allTags,
        audid
        
  
      }
  
  
      console.log(val,"+===============================")
      dispatch(AddNotify(val))


      const data1={
        postid:postId,
        audid
      }
     

      dispatch(AddaudioNotify(data1))
    }else if (proType=="scripts"){
      const val={
        type:proType,
        postid:postId,
        data:allTags,
        audid:""
        
  
      }
  
  
      console.log(val,"+===============================")
      console.log("jsgbdhsadhasdf","@@@@@@@@@@@@@@@@@@@@@@@@")

      dispatch(AddNotify(val))

    }

    
    
   }
  const clickHandler=()=>{
    setTrigger(true)
    console.log(EditorData,"99999")
    const data={
      id:postId,
      summary:EditorData.editorData
    }

    dispatch(publishStory(data))
    handleNotifications("scripts")
    dispatch(changeNavTrigger())
   
  }

  useEffect(()=>{

    dispatch(resetAudid())
    
  },[])

  useEffect(()=>{

    if(audid!=""){
      handleNotifications("audios")

    }

  },[audid])

  const clickHandler2=()=>{
    setTrigger(true)
    const data={
      
      body:EditorData.editorData,
      url:AudioUrl
    }

    dispatch(AddNewAud(data))
    
    dispatch(changeNavTrigger())
   
  }

  const goToProfile=()=>{

    return navigate(`/user/${userId}`,{state:{loggedId:logged.userId.id}})
  }


  const handleUnpublishAudio=()=>{
   dispatch(unPublishAudio({id:audId}))
    .then(()=>dispatch(getMyAudio({dummy:"dummy"})))
   
  }


  const handleUnpublish=()=>{

    console.log("unpublish sriptssssssssssssssssss")
    dispatch(unPublishScript({id:postId}))
    dispatch(getMyPublished({dummy:"dummy"}))

  }

  const getTags=()=>{
    
    
    
    console.log(EditorData.editorData)
    }


    useEffect(()=>{

      let timeout
      if(!EditorData.loading){

        timeout=setTimeout(() => {
          setTrigger(false)
        }, 2000);
       
      }


      return ()=>(clearTimeout(timeout))

    },[EditorData.loading])

  return (

    <>
    <HeadWrapper align={align}>
      <div
        className="headLeft"
        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <ProfilePic onClick={goToProfile}>
          <img
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            src={img}
            alt=""
          />
        </ProfilePic>

        
        <ProfileName type={type} onClick={goToProfile}>{name}</ProfileName>

        {
          type?<span style={{marginLeft:"0.5rem",color:"#808080"}}>4 hrs ago</span>:null
        }
      </div>
{

  type?null:(

    <div className="headRight">

      {

text=="published" && !noMenu && postType=="audios"?(
  <Tooltip title="unpublish">
<PublishIcon style={{ marginRight: '0.2rem', color: '#587b7f', cursor: 'pointer' }} onClick={handleUnpublishAudio} />
</Tooltip>

):null

      }

      {
        text=="published" && !noMenu && postType=="scripts"?(
          <Tooltip title="unpublish">
        <PublishIcon style={{ marginRight: '0.2rem', color: '#587b7f', cursor: 'pointer' }} onClick={handleUnpublish} />
      </Tooltip>

        ):null
      }

      {
        text=="save" && !noMenu?(<Tooltip title="publish script">
        <PublishIcon style={{ marginRight: '0.2rem', color: '#587b7f', cursor: 'pointer' }} onClick={handleClose} />
      </Tooltip>):null
      }
        {
          text=="Fav" && !noMenu?( <Tooltip title="publish audio">
          <PublishIcon style={{ marginRight: '0.2rem', color: '#587b7f', cursor: 'pointer' }} onClick={handleClose2} />
        </Tooltip>):null
        }

       

        <Tooltip title="script offer">
          <TextSnippetIcon style={{ color: '#587b7f', cursor: 'pointer' }} />
        </Tooltip>
      </div>

  )
}
      
    </HeadWrapper>

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add summary</DialogTitle>
        <DialogContent>
         
          <Editor1 purpose="summarise" url={postId && `https://storybook-web-app.onrender.com/publish/${postId}`} address="address" customWidth="100%"/>
          {
            
            EditorData.loading && setTrigger?<CircularProgress />:
            EditorData.msg?<Alert severity="success">{EditorData.msg}</Alert>:
            EditorData.err?
            <Alert severity="error">{EditorData.err}</Alert>:
            null
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={clickHandler}>publish</Button>
          
        </DialogActions>
      </Dialog>


      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Publish Audio</DialogTitle>
        <DialogContent>
         
          <Editor1 purpose="summarise" type="upload" url={postId && `https://storybook-web-app.onrender.com/publish/${postId}`} customWidth="100%"/>
          {
            EditorData.loading && setTrigger?<CircularProgress />:
            EditorData.msg?<Alert severity="success">{EditorData.msg}</Alert>:
            EditorData.err?
            <Alert severity="error">{EditorData.err}</Alert>:
            null
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={clickHandler2}>publish</Button>
          
        </DialogActions>
      </Dialog>

    </>
  );
}

export default CardHead;

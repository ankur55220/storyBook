import React, { useState, useRef, useEffect } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
  ContentState,
  Modifier,
  SelectionState,
  ContentBlock,
  convertToRaw
} from 'draft-js';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AddBookMark, removeBookmark,getAllBookMark,updateFav } from '../../store/audio-slice';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortIcon from '@mui/icons-material/Sort';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { ErrorRounded } from '@mui/icons-material';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { getSingleSave } from '../../store/audio-slice';
import { useParams } from 'react-router-dom';
import { v4 as uuidv } from 'uuid';
import { CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../../component/Buttons/CustomButton'

let gumStream = null;
let recorder = null;
let audioContext = null;

const Btn = styled.button`
display: inline-block;
padding: 0.2rem 1.5rem;
outline: none;
border: none;
background-color: #${(props) => props.theme.colors.btn_bg_light};
color: #${(props) => props.theme.colors.btn_clr_light};
font-size: 0.5rem;
letter-spacing: 2px;
border-radius: 5px;
display: flex;
align-items: center;
margin-right: 1.2rem;
`;

const Bookmrk = styled(Btn)`
background-color: #ffff;
color: #${(props) => props.theme.colors.btn_bg_light};
margin-right: 0;

border: 1px solid #a5a58d;
`;

const Custom = styled(Btn)`
padding: 0.6rem 1rem;
margin-right: 0;
`;


function Reader() {
  const { status,mediaBlobUrl } =
    useReactMediaRecorder({ audio: true,blobPropertyBag: { type: "audio/mpeg" }});

  const dispatch = useDispatch();
  const {id}=useParams()

  const [readerBody,setReaderBody]=useState(EditorState.createEmpty())
  // const data = useSelector((state) => state.bookmark.bookmarks);
  const data=useSelector(state=>state.audio)

  const [editor, setEditor] = useState();

  const [bookmarks,setBookmarks]=useState([])

  useEffect(()=>{


    console.log(data,"inside changes")

    if(data && data.data && data.data.post && data.data.post.length>0){
      

      const json=JSON.parse(data.data.post[0].body)
      console.log(json,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")

      setBookmarks(data.data.post[0].bookmarks)
      console.log(data.data.post[0].bookmarks,"===========>>>")
      const state=EditorState.createWithContent(convertFromRaw(json))
      setEditor(state)
      
    }
    
 

  },[JSON.stringify(data)])
 
  

  const mediaRecorder = useRef(null);
  
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [speed, setSpeed] = useState(70000);

  const [playstart, setPlayStart] = useState(false);

  const [currPos, setcurrPos] = useState(0);

  const [fastCounter, setFastCounter] = useState(0);
  const [slowCounter, setSlowCounter] = useState(0);
  const [removed, setRemoved] = useState(false);

  const [audioChunk,setAudioChunk]=useState([])
  const [stream,setStream]=useState('')
  const [url,setUrl]=useState('')
  const [temp,setTemp]=useState('')
  const [recorderState,setRecorderState]=useState('')
  const hook = useRef();
  const [rec,setRec]=useState(false)
  const [paus,setPaus]=useState(false)

  const getStream=async()=>{

    if("MediaRecorder" in window){

    
    try{

      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
    });

    setStream(streamData)


    }
    catch(err){
      console.log(err)

    }
  }else{
    alert("this device doesnt have media recording")
  }
  }

  useEffect(() => {

    const postData={
      postId:id
    }

    console.log("mere mehboob mere sanam")

    dispatch(getSingleSave(postData))
    dispatch(getAllBookMark(postData))

    getStream()
    const foo = () => {
      console.log('clicked');
      setPlayStart(false);
    };
    window.addEventListener('click', foo);

    return () => {
      window.removeEventListener('click',null);
    };
  }, []);

  useEffect(() => {
    if (removed) {
      const selection = editor.getSelection();
      const content = editor.getCurrentContent();

      const newState = Modifier.removeInlineStyle(content, selection, 'BOOKMARK');

      const newData = EditorState.push(editor, newState, 'remove-inline');

      setEditor(newData);

      setRemoved(false);
    }
  }, [removed]);
  const styleMap = {
    BOOKMARK: {
      backgroundColor: 'tomato',
      color: 'white'
    },
    "H1":{
      fontSize:"32px",
      fontWeight:"bold"
    },
    "H2":{

      fontSize:"24px",
      fontWeight:"bold"

    }
  };
  const bookmark = () => {
    

    
    const currentStyle = editor.getCurrentInlineStyle();

    const content = editor.getCurrentContent();

    const selected = editor.getSelection();

    const anchorKey = selected.getAnchorKey();
    const currentContent = editor.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(anchorKey);

    const start = selected.getStartOffset();
const end = selected.getEndOffset();

const selectedText = currentBlock.getText().slice(start, end);

console.log(selectedText)

    let newState;

    if (!currentStyle.has('BOOKMARK')) {
      const data = {

        postId:id,
        docId: uuidv(),
        name:selectedText,
        start: selected.getAnchorOffset(),
        end: selected.getFocusOffset(),
        point: hook.current.scrollTop
      };

      console.log(data)

      let copy=JSON.parse(JSON.stringify(bookmarks))

      // const found=copy.findIndex((item)=>item.id)
      // dispatch(AddBookMark(data));

      // if(found==-1){
      //   copy.push(copy)
      //   setBookmarks(copy)

      // }

      copy.push({
        id: uuidv(),
        name:selectedText,
        start: selected.getAnchorOffset(),
        end: selected.getFocusOffset(),
        point: hook.current.scrollTop

      })



      setBookmarks(copy)



     

      

      newState = Modifier.applyInlineStyle(content, selected, 'BOOKMARK');
    }

    const finalState = EditorState.push(editor, newState, 'apply-inline');

    setEditor(finalState);
  };

  const deleteHandler=(poid,docuid,start,end)=>{

    const data={
      postId:poid,
      docId:docuid
    }

    let copy=JSON.parse(JSON.stringify(bookmarks))

  //  const found=copy.findIndex((item)=>item.postId=poid)

  //   if(found==-1){
  //     alert("something went wrong")
  //     return 

  //   }

    copy=copy.filter(item=>item.id!=docuid)

    setBookmarks(copy)
    // dispatch(removeBookmark(data))

    removeBookmark(start,end)

    
    // dispatch(getAllBookMark({postId:poid}))

  }


  const updateHandler=(poid)=>{

    const dat=JSON.stringify(convertToRaw(editor.getCurrentContent()))

    const val={
      postId:poid,
      body:dat
    }

    dispatch(updateFav(val))
    dispatch(getSingleSave({postId:poid}))
    dispatch(AddBookMark({postId:poid,bookmarks}));
    dispatch(getAllBookMark({postId:poid}))

  }
  const takeMe = (pos) => {
    hook.current.scrollTop = pos;
  };

  const play = (e) => {
    e.stopPropagation();
    setPlayStart(true);
    scroll.scrollToBottom({
      duration: speed,
      smooth: 'linear',
      containerId: 'test'
    });
  };

  const controllSpeed = (e, direction) => {
    e.stopPropagation();
    let currspeed = speed;

    console.log(playstart, '===>>>PPPP');
    if (direction == 'slow' && playstart) {
      let newSpeed = currspeed + 5000;

      console.log('helloooo');
      setSlowCounter(slowCounter + 1);

      if (fastCounter > 0) {
        setFastCounter(fastCounter - 1);
      }
      scroll.scrollToBottom({
        duration: newSpeed,
        smooth: 'linear',
        containerId: 'test'
      });

      setSpeed(newSpeed);
    } else if (direction == 'fast' && playstart && currspeed >= 5000) {
      let newSpeed = speed - 5000;

      setFastCounter(fastCounter + 1);

      if (slowCounter > 0) {
        setSlowCounter(slowCounter - 1);
      }
      scroll.scrollToBottom({
        duration: newSpeed,
        smooth: 'linear',
        containerId: 'test'
      });

      setSpeed(newSpeed);
    }
  };

  const pause = (e) => {
    e.stopPropagation();
    setPlayStart(false);
    hook.current.scrollTop = hook.current.scrollTop;
  };

  const removeBookmark = (start,end) => {
    // const end = EditorState.moveSelectionToEnd(editor).getSelection().getAnchorOffset();
    // const key = editor.getSelection().getAnchorKey();

    // console.log(end);

    // const newSelection = SelectionState.createEmpty(key);

    // const newSelect = newSelection.merge({
    //   anchorOffset: 0,
    //   anchorKey: key,
    //   focusOffset: end
    // });

    // let newState = EditorState.acceptSelection(editor, newSelect);

    // setEditor(newState);
    // setRemoved(true);

      const newstart=start
      const newend=end;

      let newSelection=SelectionState.createEmpty(editor.getSelection().getAnchorKey());

      newSelection=newSelection.merge({
        anchorOffset:newstart,
        focusKey:editor.getSelection().getAnchorKey(),
        focusOffset:newend
      })

      let newState=EditorState.forceSelection(editor,newSelection)

      setEditor(newState)
      setRemoved(true)

    
  };

  const mimeType = "audio/webm";
  // const startRecording=async()=>{
  //   const media = new MediaRecorder(stream, { mimeType });

  
  //   mediaRecorder.current = media;

  //   await mediaRecorder.current.start(1000);

  //   let localAudioChunks = [];
  //   console.log(mediaRecorder.current)

  //   mediaRecorder.current.ondataavailable = (event) => {

  //     if (typeof event.data === "undefined") return;
  //     if (event.data.size === 0) return;
  //     localAudioChunks.push(event.data);
  //  };

  //  setAudioChunk(localAudioChunks)


  // }

  // const stopRecording=async()=>{
  //   console.log(audioChunk,"===>>>>>")
  //   mediaRecorder.current.stop();

    
  //   const audioBlob = new Blob(audioChunk, { type: mimeType });

  //   const audioUrl = URL.createObjectURL(audioBlob);
    
  //   setUrl(audioUrl)
  //   setAudioChunk([])

  // }


  const down=async ()=>{

    console.log(mediaBlobUrl)
    fetch(mediaBlobUrl)
    .then((res)=>{

      return res.blob()
    })
    .then((res2)=>{
      
      console.log(res2)
      const audiofile = new File([res2], "audiofile.mp3", {
        type: "audio/mpeg",
      });

      const newUrl=window.URL.createObjectURL(audiofile)


  setTemp(newUrl)
      console.log(newUrl)
    
    })
    .catch((err)=>{
      console.log(err)
    })
    
    
    
  }


  

    

  const startRec = () => {
    setRec(true)
    setPaus(false)
    setRecorderState(RecordState.START)
  }
 
  const stopRec = () => {

    setRec(false)
    setPaus(false)
    setRecorderState(RecordState.STOP)
  }

  const pauseRec=()=>{
    setRec(false)
    setPaus(true)
    setRecorderState(RecordState.PAUSE)
  }
 
  //audioData contains blob and blobUrl
 const onStopRec = (audioData) => {
    console.log('audioData', audioData.blob)

    const url=URL.createObjectURL(audioData.blob)

    console.log(url,"oooo")
    setUrl(url)
  }

   
  
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
        <div
          className="accord-box"
          style={{ width: '10%', marginRight: '1.5rem', marginTop: '5rem' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography sx={{ color: '#646e78', fontWeight: '500' }}>Bookmarks</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div
                className="top"
                style={{
                  width: '100%',
                  height: '5vh',
                  backgroundColor: '#646e78',
                  color: '#ffff',
                  textAlign: 'right'
                }}>
                <SortIcon sx={{ marginRight: '0.5rem', cursor: 'pointer' }} />
              </div>

              <div
                className="top"
                style={{
                  width: '88%',
                  paddingLeft: '1rem',
                  color: '#646e78',
                  margin: 'auto',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  maxHeight: '30vh',
                  overflowX: 'auto'
                }}>
                <ul className="items" style={{ listStyle: 'none', paddingLeft: 0 }}>

                  {
                    bookmarks?bookmarks.map((item)=> <li className="item" style={{ marginBottom: '1.2rem',cursor:"pointer" }} onClick={()=>takeMe(item.point)}>
                    {item.name} <DeleteIcon onClick={()=>{deleteHandler(id,item.id,item.start,item.end)}} />
                  </li>):<CircularProgress />
                  }

                 
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
           
           <CustomButton content="update" fun={()=>{updateHandler(id)}} />
          
        </div>

        <div
          id="test"
          className="Editor-body"
          style={{
            width: '65%',
            height: '55vh',
            border: '1px solid #a5a58d',
            overflowY: 'scroll',
            padding: '2rem 0.8rem',
            fontFamily: 'Courier Prime, monospace',
            lineHeight: 1.5,
            marginTop: '5rem',
            color: '#646e78'
          }}
          ref={hook}>

            {
              editor?<Editor editorState={editor} onChange={setEditor} customStyleMap={styleMap} />:"loading..."
            }
              
            
          
        </div>
      </div>

      

      <Stack
        spacing={2}
        direction="row"
        sx={{ width: '62%', marginLeft: '25%', justifyContent: 'space-between' }}>
        {/* <Button variant="contained" onClick={play}>play</Button> */}
        {/* <Button variant="contained" onClick={pause}>pause</Button> */}
        {/* <Button variant="contained" onClick={(e)=>{controllSpeed(e,"fast")}}>fast &nbsp; &nbsp;{fastCounter>0?<span>{fastCounter} X</span>:null}</Button>
      <Button variant="contained"  onClick={(e)=>{controllSpeed(e,"slow")}}>slow &nbsp; &nbsp;{slowCounter>0?<span>{slowCounter} X</span>:null}</Button> */}

        {/* <Button variant="contained" onClick={removeBookmark}>Remove All Bookmarks</Button> */}

        {/* <Button variant="contained" onClick={()=>{console.log(data)}}>data</Button> */}
        <div
          className="wrapper"
          style={{
            width: '80%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
          <Btn onClick={play}>
            Play <PlayArrowIcon />
          </Btn>
          <Btn onClick={pause}>
            Pause <PauseIcon />
          </Btn>

          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Custom>slow</Custom>
            <div className="speedBox" style={{ margin: '0.2rem 1rem', color: '#646e78' }}>
              1 X
            </div>
            <Custom>fast</Custom>
          </span>
        </div>
        <div
          className="middle"
          style={{ width: '50%', textAlign: 'center' }}>
         
         <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"6rem"}}>
         <AudioReactRecorder state={recorderState} onStop={onStopRec} canvasWidth="0" canvasHeight="0" />
 
 <div className="inner_left" style={{width:"25%",height:"100%",marginRight:"0.5rem",display:"flex",flexDirection:"column",justifyContent:"center",paddingTop:"1.5rem"}}>
 {/* <button onClick={startRec}><KeyboardVoiceIcon /></button> */}
 {/* <button onClick={stopRec}>Stop</button> */}

 <div className="upper_record_btn" style={{marginBottom:"0.5rem",border:"1px solid #a5a58d",borderRadius:"50%",width:"50%",marginLeft:"20%",color:"#646e78"}}>
 <KeyboardVoiceIcon onClick={startRec} sx={{cursor:"pointer",color:rec?"green":""}}/>
 </div>

 <div className="lower_utility_btns" style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",color:"#646e78"}}>
  <PauseCircleOutlineIcon sx={{cursor:"pointer",color:paus?"green":""}} onClick={pauseRec}/>
  <StopCircleIcon sx={{cursor:"pointer"}} onClick={stopRec}/>

 </div>

 </div>
 
<div className="inner_right" style={{width:"75%"}}>

<audio src={url} style={{width:"100%"}} controls></audio>
</div>
 

 
      
    </div>
          
        </div>
        <div className="otherWrapper" style={{paddingTop:"1%",height:"3rem",marginTop:"1rem"}}>
          <Bookmrk>
            <BookmarkIcon onClick={bookmark}/>
          </Bookmrk>
        </div>
      </Stack>
    </>
  );
}

export default Reader;

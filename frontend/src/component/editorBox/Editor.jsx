import React, { useState,useRef,useEffect } from 'react'
import { Editor,EditorState,Modifier,RichUtils,CompositeDecorator,SelectionState,AtomicBlockUtils,convertFromRaw,convertToRaw} from 'draft-js'
// import CustomInput from '../input/CustomInput';
import UseForm from '../input/CustomInput';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FileInput from '../input/FileInput'
import CustomButton from '../Buttons/CustomButton';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import LinearProgressWithLabel from '../ProgressBar/ProgressBar';
import storage from '../../firebaseConfig'
import {addData} from '../../store/editor-slice'
import { useDispatch,useSelector } from 'react-redux';
import {CircularProgress}  from '@mui/material';
import { addUrl } from '../../store/audio-slice';
import { getNameAndId } from '../../store/editor-slice';
const Btn1=styled.button`
  
  display:inline-block;
  padding:0.5rem 1.2rem;
  outline:none;
  border:none;
  background-color:#cad2c5;
  color:#${(props)=>(props.theme.colors.btn_clr_light)};
  font-size:0.8rem;
  border-radius:5px;
  display:flex;
  align-items:center;
  margin-right:1.2rem;
  cursor:pointer;
  `


function Audio(props){

  return <audio src={props.src} controls/>
}

function Editor1({type,address,content,loading,url,customWidth,customHeight,noBorder,regex,purpose}) {

  const dispatch=useDispatch()
  const editorData=useSelector(state=>state.editor)
  const [popup,setPopup]=useState(false)
  const [linkUrl,setLinkUrl]=useState('')
  const [pos,setPos]=useState({
    start:-1,
    end:-1
  })

  const findLinkEntities = (contentBlock, callback, contentState) => {

    contentBlock.findEntityRanges((character) => {
         const entityKey = character.getEntity();
   
       
         return (
             entityKey !== null &&
             contentState.getEntity(entityKey).getType() === "LINK"
         );
     }, callback);
   
   
     
   };


   const Link = ({ entityKey, contentState, children }) => {
  let { url } = contentState.getEntity(entityKey).getData();

  console.log("oooooooooooooooooooooooooooooo")
  return (
      <a
          style={{ color: "blue", fontStyle: "italic" }}
          href={url}
          target="_blank"
      >
          {children}
      </a>
  );
};
  const deco=new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
  }
  ])

  const [open,setOpen]=useState(false)

  const [file,setFile]=useState('')
  const [percent,setPercent]=useState(0)

  const [fileUrl,setFileUrl]=useState('')


  const [value,Form,setValue]=UseForm({
    padding:"0.4rem 0.7rem", 
    width:"30%",
    placeholder:"script link here"
  })

  useEffect(()=>{

    if(url){
       setValue(url)
    }
  },[url])

 
  const handleClose=()=>{
    setOpen(!open)
  }


  function mediaBlockRenderer(block){

    if(block.getType()==="atomic"){
      return {component:Media,editable:false}
    }

    return null
  }

  
  
  useEffect(()=>{

    


    window.addEventListener('click',()=>{setPopup(false)})
    window.addEventListener('keydown',(e)=>{

      if(e.key=="Backspace" || e.key=="Delete"){
        setPopup(false)
      }
    })

    
    return ()=>{window.removeEventListener('click',null);window.removeEventListener('keydown',null)}

  },[])

  useEffect(()=>{
   console.log(content,"00000")
   if(content){
    setEditor(EditorState.createWithContent(convertFromRaw(JSON.parse(content)),deco))

   }
  },[content])
  // useEffect(()=>{

  //   if(popup && pos.start!=-1 && pos.end!=-1){
  //     console.log("yeahhhh")

  //     // updateSelection(pos.start,pos.end)



  //     // setPos((prev)=>{
  //     //   prev.start=-1
  //     //   prev.end=-1
    
  //     //   return prev
  //     // })
  //   }
  // },[popup])

  

const btnstyle={
  display:"inline-block",
  padding:"0.5rem 1.2rem",
  outline:"none",
  border:"none",
  backgroundColor:"#cad2c5",
  color:"#ffff",
  fontSize:"0.8rem",
  borderRadius:"5px",
  display:"flex",
  alignItems:"center",
  marginRight:"1.2rem",
  cursor:"pointer"

}

const btnstyle2={
  display:"inline-block",
  padding:"0.5rem 1.2rem",
  outline:"none",
  border:"1px solid #adadad",
  backgroundColor:"#cad2c5",
  color:"#ffff",
  fontSize:"0.8rem",
  borderRadius:"5px",
  display:"flex",
  alignItems:"center",
  marginLeft:"0.3rem",
  cursor:"pointer"

}


const HandleSpan = (props) => {

  console.log(props.start,"jjjjjj")

  setPos((prev)=>{
    prev.start=props.start
    prev.end=props.end

    return prev
  })


  

  // setPos(prev=>{
  //   prev.start=props.start
  //   prev.end=props.end

  //   return prev
  // })

  setPopup(true)
  return (
    <span style={{color:"blue"}} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};







const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleStrategy,
    component: HandleSpan
  }
  
]);


const LinkDecorator=()=>{

  const Links=new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
  },
  {
    strategy: handleStrategy,
    component: HandleSpan

  }
  ])

  return Links
}



const addLink=(userid,username)=>{
  const contentState= editor.getCurrentContent();
  
  const select=editor.getSelection().merge({
    anchorOffset:pos.start,
    focusOffset:pos.end
  })

  const newDecorator=LinkDecorator()
  console.log(editor.getSelection())

  
  const contentStateWithEntity = contentState.createEntity(
    'LINK', 'MUTABLE', {url: `http://localhost:8080/user/${userid}`,type:"tag",userid} // link for testing only
);

const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
 const updatedState=Modifier.replaceText(contentState,select,`${username}`,null,entityKey);

 const newState=EditorState.createWithContent(updatedState,newDecorator)

 console.log(newState)
 
 setEditor(newState)


}





    const [editor,setEditor]=useState(

      purpose && purpose=="summarise"?EditorState.createEmpty(compositeDecorator):EditorState.createEmpty()
      )
    const hook=useRef()

  
    const style={
      "H1":{
        fontSize:"32px",
        fontWeight:"bold"
      },
      "H2":{

        fontSize:"24px",
        fontWeight:"bold"

      }
    }

    const applyStyle=(e,type)=>{
  console.log(type)

  
      if(type=="B"){
       
        // const content=editor.getCurrentContent();
        // const selected = editor.getSelection();

        // const newState=Modifier.applyInlineStyle(content,selected,"BOLD")

        // const finalState=EditorState.push(editor,newState,"apply-style")

        // setEditor(finalState)

        const newState=RichUtils.toggleInlineStyle(editor,"BOLD")
        
        setEditor(newState)

      }else if(type=="H1"){

        const newState=RichUtils.toggleInlineStyle(editor,"H1")
        
        setEditor(newState)

      }else if(type=="H2"){

        const newState=RichUtils.toggleInlineStyle(editor,"H2")
       
        setEditor(newState)


      }
    }

    const HANDLE_REGEX = /\@[\w]+/g;// eslint-disable-line

    

    function handleStrategy(contentBlock, callback, contentState) {
      
      findWithRegex(HANDLE_REGEX, contentBlock, callback);
    }


    function findWithRegex(regex, contentBlock, callback) {
      const text = contentBlock.getText();

      console.log("here hii")

      let matchArr,
        start;
      // eslint-disable-next-line

     

      let flag=false;
      while ((matchArr = regex.exec(text)) !== null) {
        console.log("xwsdsf",matchArr)

        const newText=matchArr[0].slice(1)
        console.log("00000000",newText)

        dispatch(getNameAndId({name:newText}))
        flag=true;
        // eslint-disable-next-line
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
      }

      if(!flag){
        setPopup(false)
      }
    }


   
function getInfo(){
  const content=editor.getCurrentContent();

  const selection=editor.getSelection();

  const key=selection.getStartKey();

  const bloc=content.getBlockForKey(key)


  const entityKey=bloc.getEntityAt(selection.getStartOffset());

  if(entityKey){

    const ent=content.getEntity(entityKey)
    console.log(ent)
  }


}

function test(e){
  console.log(e.target.value)

  setLinkUrl(e.target.value)
}


function createLink(){

  if(value.length>0 || address){


    const contentState= editor.getCurrentContent();
  
  const select=editor.getSelection()

  const newDecorator=LinkDecorator()
  

  
  const contentStateWithEntity = contentState.createEntity(
    'LINK', 'MUTABLE', {url:value} // link for testing only
);

const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
 const updatedState=Modifier.applyEntity(contentState,select,entityKey)

 const newState=EditorState.createWithContent(updatedState,newDecorator)

 console.log(newState)
 
 setEditor(newState)

 setLinkUrl('')



  }
  

}


const fileUpload=(e)=>{


  
  setFile(e.target.files[0])

}


const upload=()=>{

  if(!file){
    alert("no files to upload")

  }


  const storageRef= ref(storage,`/audio/${file.name}`)

  const uploadTask=uploadBytesResumable(storageRef,file)

  uploadTask.on(
    "state-changed",
    (snapshot)=>{
      const percentage=Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100);

      setPercent(percentage)
    },
    (err)=> console.log(err),
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((url)=>{

         dispatch(addUrl(url))
      })
    }

  )
}

const AddMediaBlock =()=>{

  if(!fileUrl){
    return
  }
  const content=editor.getCurrentContent()

  const contentWithEntity=content.createEntity('audio','IMMUTABLE',{src:fileUrl})

  const entityKey=contentWithEntity.getLastCreatedEntityKey();

  const newState=EditorState.set(editor,{currentContent:contentWithEntity})
 const updatad=AtomicBlockUtils.insertAtomicBlock(newState,entityKey,' ')
 

 
  setEditor(updatad)
}


const Media=(props)=>{
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));

 const {src} = entity.getData();
 const type = entity.getType();

 let media;

 if(type=='audio'){
  media=<Audio src={src}/>
 }

 return media;
}



useEffect(()=>{


  if(type!="readOnly"){
    // console.log(JSON.stringify(convertToRaw(editor.getCurrentContent())))
    

    const val=JSON.stringify(convertToRaw(editor.getCurrentContent()))
   dispatch(addData(val))

  }
 
},[JSON.stringify(editor.getCurrentContent())])




  return (
    <>

    <button onClick={()=>{console.log(purpose)}}>edit work</button>

{
  loading?<CircularProgress />:(

    <div style={{width:"100%",height:customHeight?customHeight:"90vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    
    


   {
    type=="readOnly"?null:(
      <div className='utility-btns' style={{width:customWidth?customWidth:"60.3%",flexWrap:"wrap",display:"flex",justifyContent:"flex-start",alignItems:"center",backgroundColor:"#cad2c5"}}>
      
      <button style={btnstyle} onClick={(e)=>{applyStyle(e,"B")}}>B</button>  <button style={btnstyle} onClick={(e)=>{applyStyle(e,"H1")}}>H1</button>  <button style={btnstyle} onClick={(e)=>{applyStyle(e,"H2")}}>H2</button>  
      
      {type!="read"?Form:null}
      {
        type!="read" && !address?<><button style={btnstyle2} onClick={createLink}>Add</button> 
        
        
        <button style={btnstyle2} onClick={handleClose}>upload audio</button></>:

        type!="read" && address?<button style={btnstyle2} onClick={createLink}>Add Script</button>
        :null
      }
      
    </div>

    )
   }
    

    
    <div style={{fontFamily:"Courier Prime, monospace",width:customWidth?customWidth:"60%",height:customHeight?"20vh":"60vh",borderBottom:noBorder?"none":"1px solid grey",borderLeft:noBorder?"none":"1px solid grey",borderRight:noBorder?"none":"1px solid grey",lineHeight:"1.8",color:"grey",overflowY:"scroll"}} >
    
   
    
    <div className='inner-box' style={{padding:"0rem 1.2rem",position:"relative",width:'100%'}}>

    <Editor 
        
        editorState={editor}
        onChange={setEditor}
        placeholder="write your story"
        customStyleMap={style}
        ref={hook}
        blockRendererFn={mediaBlockRenderer}
        readOnly={type=="readOnly"?true:false}
        />

{
  popup?(
    <div className="popup" style={{position:"absolute",bottom:"-100px",border:"1px solid grey",backgroundColor:"white",padding:"0.2rem 0.5rem",height:"6rem",width:"20%",overflowY:"auto"}}>

      {
        editorData.loading?<CircularProgress/>:

        editorData.dropdown.names.map((item)=>{

          console.log(item,"ppppppppppppppppppppppppppp")
          return (

            <div className="item" style={{margingBottom:"1rem",fontFamily:"Lato, sans-serif",cursor:"pointer"}} onClick={()=>{addLink(item._id,item.username)}}>{item.username}</div>

          )
        })
      }
    {/* <div className="item" style={{margingBottom:"1rem",fontFamily:"Lato, sans-serif",cursor:"pointer"}} onClick={addLink}>item1</div>
    <div className="item" style={{margingBottom:"1rem",fontFamily:"Lato, sans-serif"}}>item2</div>
    <div className="item" style={{margingBottom:"1rem",fontFamily:"Lato, sans-serif"}}>item3</div>
    <div className="item" style={{margingBottom:"1rem",fontFamily:"Lato, sans-serif"}}>item4</div> */}
  </div>


  ):null
}
 
    </div>
        
    </div>
    </div>


  )
}


   


    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Audio</DialogTitle>
        <DialogContent>
          
          <FileInput width="65%" onChange={fileUpload}/>
          <CustomButton content="upload" width="25%" left="0.5rem"  size="0.8rem" fun={upload}/>

          <LinearProgressWithLabel value={percent} />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={AddMediaBlock}>Add</Button> */}
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Editor1
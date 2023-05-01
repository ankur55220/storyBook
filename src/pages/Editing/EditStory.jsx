import React,{useState} from 'react'
import { PageWrapper } from '../../universal'
import UseForm from '../../component/input/CustomInput'
import styled from 'styled-components'
import Editor1 from '../../component/editorBox/Editor'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Btn from '../../component/Buttons/CustomButton'
import { useSelector,useDispatch } from 'react-redux'
import { saveedit,getSingleData,updateedit } from '../../store/editor-slice'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Alert from '@mui/material/Alert';
import {CircularProgress} from '@mui/material'
const PageWrapperFullScreen=styled(PageWrapper)`
height:90vh;
overflow-y:auto;
align-items:flex-start;
justify-content:center;
background-color:#ffff;
`

const Container=styled.div`
width:80%;
margin-top:1.5rem;
padding:1.5rem 1rem;
border-radius:10px;

background-color:#ffff;

`
function EditStory() {

const dispatch=useDispatch();
const [content,setContent]=useState("")
const editorData=useSelector((state)=>state.editor)
const [value,Form,setValue]=UseForm({
    placeholder:"working title here"
})

const {id}=useParams()

const [genre, setGenre] = React.useState('');

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

const clickHandler=()=>{
  console.log("askjdjasdg")
  const data={
    postId:id,
    title:value,
    body:editorData.edited?editorData.editorData:editorData?.backendEditdata?.post?.body,
    genre:genre
  }

  dispatch(updateedit(data))

}


useEffect(()=>{
    const data={
        id,
    }

    console.log("sadsf")
dispatch(getSingleData(data))
},[])

useEffect(()=>{

   console.log(editorData.backendEditdata.post,"just to make sure")

   if(editorData.backendEditdata){

    setContent(editorData.backendEditdata.posts[0].body)
    console.log(editorData.backendEditdata.posts[0].body)
    setGenre(editorData.backendEditdata.posts[0].genre)
    setValue(editorData.backendEditdata.posts[0].title)

   }
   


},[editorData.backendEditdata])
  return (
    <PageWrapperFullScreen>

      {
        editorData.loading?<CircularProgress />:(

          <Container >
          {
            editorData.msg?<Alert severity="success">{editorData.msg}</Alert>:
            editorData.err? <Alert severity="error">{ editorData.err}</Alert>:null

          }
        {Form}

        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genre}
          label="Genre"
          onChange={handleChange}
        >
          <MenuItem value="Horror">Horror</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="comedy">Comedy</MenuItem>
          <MenuItem value="Thriller">Thriller</MenuItem>
          <MenuItem value="Crime">Crime</MenuItem>
        </Select>
      </FormControl>
    </Box>


        <Editor1 type="read" content={content?content:null} loading={editorData.loading}/>

{
  editorData.loading?<CircularProgress />:null
}
        <Btn  content="update" fun={clickHandler}/>
        </Container >
        )
      }
        
    </PageWrapperFullScreen>
  )
}

export default EditStory
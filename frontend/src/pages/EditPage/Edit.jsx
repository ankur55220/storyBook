import React from 'react'
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
import { saveedit } from '../../store/editor-slice'
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material'
const PageWrapperFullScreen=styled(PageWrapper)`
height:90vh;
overflow-y:auto;
align-items:center;
justify-content:center;
background-color:#ffff;
border:1px solid red;
`

const Container=styled.div`
width:80%;
margin-top:20.5rem;
padding:1.5rem 1rem;
border-radius:10px;

background-color:#ffff;
border:1px solid green;


`
function Edit() {

const dispatch=useDispatch();
const editorData=useSelector((state)=>state.editor)
const [value,Form]=UseForm({
    placeholder:"working title here"
})



const [genre, setGenre] = React.useState('');

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

const clickHandler=()=>{
  console.log("askjdjasdg")
  const data={
    title:value,
    body:editorData.editorData,
    genre:genre
  }

  dispatch(saveedit(data))

}
  return (
    <PageWrapperFullScreen>

      
        <Container >
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


        <Editor1 type="read"/>
{
  editorData.loading?<CircularProgress />:null
}
        {
        editorData.msg?<Alert severity="success">{editorData.msg}</Alert>:
        editorData.err? <Alert severity="error">{editorData.err}</Alert>:null
      }

        <Btn  content="save" fun={clickHandler}/>
        </Container >
    </PageWrapperFullScreen>
  )
}

export default Edit
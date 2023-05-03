import React,{useEffect} from 'react'
import { PageWrapper } from '../../universal'
import styled from 'styled-components'
import Input from '../../component/input/CustomInput'
import Title from '../../component/title/Title'
import CustomButton from '../../component/Buttons/CustomButton'
import UseForm from '../../component/input/CustomInput'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {loginUser,registerUser,clearMsg} from '../../store/user-slice'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

const SignupBox=styled.div`
    
width:30%;
padding:0.5rem 1.5rem;
background-color:#ffff;
border-radius:10px;


`

const NewWrapper=styled(PageWrapper)`
min-height:100vh
`
function Signup() {

  const dispatch=useDispatch()
 const navigate=useNavigate()
  const loading = useSelector((state)=>state.users)

  useEffect(() => {
    
    if(loading.msg=="successfully registered"){
        return navigate("/")
    }
  
    
  }, [loading.msg])
  

    const [emailVal,EmailForm]=UseForm({
        type:"email", 
        id:"email",
        label:"Email",
        placeholder:"example@gmail.com"
    })
    const [usernameVal,UsernameForm]=UseForm({
        type:"text", 
        id:"name", 
        label:"username",
        placeholder:"username"
    })

    const [passwordVal,PasswordForm]=UseForm({
        type:"password",
        id:"password",
        label:"password", 
        placeholder:"password"
    })


   


    //functions ############################

    const handleSubmit=async()=>{

       
        console.log(emailVal,usernameVal,passwordVal)

        const backdata={
            username:usernameVal,
            email:emailVal,
            password:passwordVal
        }


        dispatch(registerUser(backdata))
        // const reg=await axios.post("http://localhost:4000/signup",backdata)

        // const res=await reg.data;


        // console.log(res)

    }

    const moveTo=()=>{
        dispatch(clearMsg())
        return navigate("/")
    }
  return (
    <NewWrapper>

        <SignupBox>

            <Title title="Signup"/>
        {/* <div style={{borderTop:"1px solid #D3D3D3",marginBottom:"1rem"}}></div> */}
        {/* <Input type="text" id="name" label="username" placeholder="username"/>

        <Input type="email" id="email" label="Email" placeholder="example@gmail.com"/>

        <Input type="password" id="password" label="password" placeholder="password"/> */}

        {UsernameForm}
        {EmailForm}
        {PasswordForm} 

        {
            loading.loading==true?<CircularProgress/>:null
        }
        
        {

            loading.msg? <Alert severity="success">{loading.msg}</Alert>:
            loading.err? <Alert severity="error">{loading.err}</Alert>:
            null
        }
        
        <CustomButton content="sign up" fun={handleSubmit}/>

        <div style={{borderTop:"1px solid #D3D3D3",marginBottom:"1rem",marginTop:"1rem"}}></div>

        <div className="login-footer" style={{textAlign:"center",fontFamily:"'Lato', sans-serif"}}>
            Already have an acoount?

        </div>
        <div className="login-footer2" style={{textAlign:"center",marginTop:"1rem",marginBottom:"1rem",fontFamily:"'Lato', sans-serif",color:"blue",fontWeight:"bold",cursor:"pointer"}} onClick={moveTo}>
            Login

        </div>
        </SignupBox>
       
    </NewWrapper>



    
  )
}

export default Signup
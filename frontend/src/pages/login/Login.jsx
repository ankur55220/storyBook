import React,{useState,useEffect} from 'react'
import { PageWrapper } from '../../universal'
import styled from 'styled-components'
// import Input from '../../component/input/CustomInput'
import Title from '../../component/title/Title'
import CustomButton from '../../component/Buttons/CustomButton'
import Sidebar from '../../component/Sidebar/Sidebar'
import Card from '../../component/Cards/Card'
import UseForm from '../../component/input/CustomInput'
import { useSelector,useDispatch } from 'react-redux'
import {loginUser,registerUser,clearMsg} from '../../store/user-slice'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

const LoginBox=styled.div`
    
    width:30%;
    padding:0.5rem 1.5rem;
    background-color:#ffff;
    border-radius:10px;
    -webkit-box-shadow: -1px 0px 5px -4px rgba(0,0,0,0.75);
-moz-box-shadow: -1px 0px 5px -4px rgba(0,0,0,0.75);
box-shadow: -1px 0px 5px -4px rgba(0,0,0,0.75);

@media (max-width: 800px) {
    width:80%;
  }
    


    `
    const PagewrapperFullScreen=styled(PageWrapper)`
    min-height:100vh;
    `
function Login() {
  
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const loading=useSelector((state)=>state.users)

    useEffect(() => {
    
        if(loading.msg=="successfully loged in"){
            return navigate("/home")
        }
      
        
      }, [loading.msg])
    

    const [emailVal,EmailForm]=UseForm({

        type:"email", 
        id:"email",
        label:"Email",
        placeholder:"example@gmail.com"

    })

    const [passwordVal,PasswordForm]=UseForm({

        type:"password",
        id:"password",
        label:"password",
        placeholder:"password"
    })

const handleLogin=()=>{

    const data={
        email:emailVal,
        password:passwordVal

    }


    dispatch(loginUser(data))

}
    

const moveTo=()=>{
    dispatch(clearMsg())
    return navigate("/signup")
}
    


  return (
  <>
    <PagewrapperFullScreen>

       

        <LoginBox>

            <Title title="Login"/>
       
       

        {/* <Input type="email" id="email" label="Email" placeholder="example@gmail.com"/>

        <Input type="password" id="password" label="password" placeholder="password"/> */}
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
        
        <CustomButton content="Login" fun={handleLogin}/>

        <div style={{borderTop:"1px solid #D3D3D3",marginBottom:"1rem",marginTop:"1rem"}}></div>

        <div className="login-footer" style={{textAlign:"center",fontFamily:"'Lato', sans-serif"}}>
            Dont have an acoount?

        </div>
        <div className="login-footer2" style={{cursor:"pointer",textAlign:"center",marginTop:"1rem",marginBottom:"1rem",fontFamily:"'Lato', sans-serif",color:"blue",fontWeight:"bold"}} onClick={moveTo}>
            Sign up

        </div>

       
        </LoginBox>
       
    </PagewrapperFullScreen>
</>


    
  )
}

export default Login
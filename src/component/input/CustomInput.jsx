import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

export const Inputv2=styled.input`
  
  outline:none;
  border:1px solid #cad2c5;
  padding:${(props)=>(props.padding || "0.8rem 0.2rem")};
  width:${(props)=>(props.width || "100%")};
  font-family: Lato, sans-serif;
  font-size:1rem;
  border-radius:10px;
  margin-top:1rem;
  margin-bottom:1.5rem;
  &:focus{
    border:2px solid #${(props)=>props.theme.colors.btn_bg_light};
  }

  
  `



function CustomInput({state,id,label,width,padding,placeholder,type,setState}) {

  
  return (
    <>
    <label htmlFor={id} style={{marginBottom:"3rem",fontFamily:"'Lato', sans-serif",fontWeight:"bold"}}>{label}</label>
    <Inputv2 padding={padding} width={width} type={type} id={id} placeholder={placeholder} onChange={(e)=>{setState(e.target.value)}} value={state}/>
    </>
  )
}

export default function UseForm(props){

  const {id,label,width,padding,placeholder,type} = props

  
  const [value,setValue]=useState("")

  return [
    value,
    <CustomInput state={value} setState={setValue} id={id} label={label} width={width} padding={padding} placeholder={placeholder} type={type}/>,
    setValue
  ]


}






import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

const Inputv2=styled.input`
  
  outline:none;
  border:1px solid #cad2c5;
  padding:${(props)=>(props.padding || "0.8rem 0.2rem")};
  width:${(props)=>(props.width || "100%")};
  font-family: Lato, sans-serif;
  font-size:1rem;
  border-radius:10px;
  margin:auto;
  &:focus{
    border:2px solid #${(props)=>props.theme.colors.btn_bg_light};
  }

  
  `
  function FileInput({padding,width,onChange,value}){

    return (

        <Inputv2 type="file" padding={padding} width={width} onChange={onChange} value={value} />
    )



  }

  export default FileInput;
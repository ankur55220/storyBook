import React from 'react'
import styled from 'styled-components'
function CustomButton({content,padding,width,translate,left,size,fun,disable}) {

const CusBtns=styled.button`

outline:none;
border:none;
display:flex;
justify-content:center;
align-items:center;
display:inline-block;
width:${width?width:"100%"};
padding:${padding?padding:"1rem 2rem"};
color:#ffff;
background-color:#${(props) =>props.disabled? "grey": props.theme.colors.btn_bg_light};
font-size:${size?size:"1rem"};
margin-left:${left?left:"0"};
transform:translateY(${translate?translate:"0"});
border-radius:10px;
cursor:pointer;
`
  return (
    <>
    
    <CusBtns disabled={disable} onClick={fun}>{content}</CusBtns>
    </>
  )
}

export default CustomButton
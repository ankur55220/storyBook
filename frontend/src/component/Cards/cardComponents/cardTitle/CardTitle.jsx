import React from 'react'
import styled from 'styled-components'
const TitleWrapper=styled.div`
      width:100%;
      padding:0rem 0.5rem;
      display:flex;
      flex-wrap:wrap;
      justify-content:space-between;
      align-items:center;
      margin-bottom:1rem;
    
    `
function CardTitle({title}) {

    
  return (
    <TitleWrapper>
       <h3>{title}</h3>
       <span style={{fontSize:"0.7rem",color:"#587b7f",fontWeight:"bold"}}>horror</span>
        
    </TitleWrapper>

    
  )
}

export default CardTitle
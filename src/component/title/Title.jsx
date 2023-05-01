import React from 'react'
import styled from 'styled-components'
function Title({title}) {


    const SecondaryHeader=styled.h2`
    font-family: Lato, sans-serif;
    text-align:left;
    margin-bottom:2rem;
    margin-top:1rem;

    
    `
  return (
    <div>
        <SecondaryHeader>{title}</SecondaryHeader>
    </div>
  )
}

export default Title
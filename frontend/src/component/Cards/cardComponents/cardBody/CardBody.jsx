import React from 'react'
import styled from 'styled-components'
import Editor1 from '../../../editorBox/Editor'

const CardBodyWrapper=styled.div`
width:100%;
 padding:0rem 0.5rem;
 margin-bottom:1.2rem;


`
function CardBody({body}) {
  const HANDLE_REGEX = /\@[\w]+/g;// eslint-disable-line

  return (
    <CardBodyWrapper>

    

      <Editor1 type="readOnly" customWidth="100%" noBorder="noBorder" customHeight="20vh" content={body} regex={HANDLE_REGEX}/> 
    </CardBodyWrapper>
  )
}

export default CardBody
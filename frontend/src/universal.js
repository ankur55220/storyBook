import styled from "styled-components"

const PageWrapper=styled.div`
width:100%;
height:90vh;
display:flex;
justify-content:center;
align-items:center;
background: rgb(2,0,36);
position:relative;
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(172,172,188,1) 0%, rgba(217,217,228,0.7539390756302521) 0%, rgba(226,226,236,1) 100%, rgba(0,212,255,1) 100%);

@media (max-width: 768px) {
    flex-direction: column;
  }

`


export {PageWrapper}
import styled from "styled-components";

export const Wrappers = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:90%;
max-width:700px;
background:#fff;
margin-top:4rem;
margin-left:auto;
margin-right:auto;
margin-bottom:6rem;
@media screen and (max-width:900px) { 
    margin-top:3.5rem;
}
`

export const Title = styled.div`
margin:1rem auto 1rem 0;
width:50%;
font-size:${props => props.theme.size.font2};
font-weight:bold;
@media screen and (max-width:700px) { 
    width:90%;
}

`
export const Content = styled.div`
margin:1rem auto 1rem 0;
width:100%;
font-size:${props => props.theme.size.font3};
display:flex;
flex-direction:column;
font-weight:normal;
@media screen and (max-width:700px) { 
    
}
`
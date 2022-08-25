import styled from "styled-components";

export const Wrappers = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:90%;
max-width:1000px;
background:#fff;
margin-top:8rem;
margin-left:auto;
margin-right:auto;
margin-bottom:6rem;

@media screen and (max-width:1050px) { 
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
export const Img = styled.img`
width:100%;
height:360px;
z-index:2;
@media screen and (max-width:1000px) {
height:31.8vw;
}
@media screen and (max-width:600px) {
    height:65.61vw;
}
`
export const Card = styled.div`
width: 48%; 
margin-bottom:16px;
background: ${props => props.theme.color.background3};
@media screen and (max-width:600px) {
    width:100%;
}
`
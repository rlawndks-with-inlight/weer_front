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

export const TitleStyle = styled.div`
font-size:${props => props.theme.size.font2};
font-weight:bold;
margin-right:16px;
`
export const Title = (props) =>{
    return (
        <>
        <div style={{display:'flex',alignItems:'center',marginTop:'16px'}}>
        <TitleStyle>
            {props?.children??""}
        </TitleStyle>
        <hr className="bar"/>
        </div>
        
        </>
    )
}
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
export const Img = styled.div`
width: 100%;
height:320px;
background:#fff;
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
background-blend-mode: multiply;
@media screen and (max-width:1200px) {
    height: 28.266666666vw;
}
@media screen and (max-width:600px) {
    height: 60vw;
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
export const WrapDiv = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
@media screen and (max-width:600px) { 
    display:none;
}
`
export const SliderDiv = styled.div`
display:none;
@media screen and (max-width:602px) { 
    display:flex;
}
`
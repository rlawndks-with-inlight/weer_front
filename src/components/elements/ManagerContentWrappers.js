import styled from "styled-components";

const ManagerContentWrappers = styled.div`
display:flex;
width:auto;
position:absolute;
left:280px;
right:0;
min-height: 100%;
flex-direction:column;
background:${(props)=>props.theme.color.background3};
min-height:100vh;
@media screen and (max-width:1000px) {
    left:0;
}
`
export default ManagerContentWrappers;
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import upsetImg from '../assets/images/upset.png'
export default function UpsetContent(props) {


  return (
    <>
    <img src={upsetImg} style={{width:'6rem',paddingTop:'3rem'}} />
    <div style={{paddingTop:'1rem'}}>{props.content} 내역이 없습니다.</div>
    </>
  );
}
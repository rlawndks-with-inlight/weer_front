import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { zRoute } from '../routes/route';
const MetaTag = props => {
    const [title, setTitle] = useState("");
    const { pathname } = useLocation();
    useEffect(() => {
        for (var i = 0; i < zRoute.length; i++) {
            if (pathname.includes(zRoute[i].link.replace(":pk", "")) && zRoute[i].link != "/") {
                setTitle("weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - " + zRoute[i].title)
            }
        }
        if(pathname=="/"){
            setTitle("weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 홈")
        }
    }, [pathname])
    return (
        <Helmet>
            <title>{props.title ? props.title : title}</title>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title ? props.title : title} />
            <meta property="og:site_name" content={props.title ? props.title : title} />
            <meta property="og:url" content={"https://weare-first.com"} />
            <meta name="twitter:title" content={props.title ? props.title : title} />
            <link rel="canonical" href={"https://weare-first.com"} />
        </Helmet>
    );
};

export default MetaTag;
import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import '../../styles/style.css'
import { Wrappers } from '../../components/elements/Wrappers';
import Modal from '../../components/Modal';

const Office = () => {
    const [isLogin, setIsLogin] = useState(false)
    return (
        <>
            <Wrappers>
               <Modal comment={'로그인이 필요합니다.'} modal={!isLogin} />
            </Wrappers>
        </>
    )
}
export default Office;
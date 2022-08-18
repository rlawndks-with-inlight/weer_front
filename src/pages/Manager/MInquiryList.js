import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import DataTable from '../../common/manager/DataTable';
import MBottomContent from '../../components/elements/MBottomContent';
import PageContainer from '../../components/elements/pagination/PageContainer';
import PageButton from '../../components/elements/pagination/PageButton';
import { range } from '../../functions/utils';
import AddButton from '../../components/elements/button/AddButton';
import Loading from '../../components/Loading';
import theme from '../../styles/theme';

const MInquiryList = () => {
    const navigate = useNavigate();
    const zColumn = [{ name: '아이디', width: 11, type: 'text', column: 'id' }, { name: '닉네임', width: 11, type: 'text', column: 'nickname' }, { name: '폰번호', width: 22, type: 'text', column: 'phone' }, { name: '레벨', width: 11, type: 'level', column: 'level' }, { name: '로그인시간', width: 33, type: 'text', column: 'last_login' }, { name: '수정', width: 6, type: 'edit', column: 'edit' }, { name: '삭제', width: 6, type: 'delete', column: 'delete' }];
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [pageList, setPageList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get(`/api/users?page=1`)
            console.log(response)
            setPosts(response.data.data)
            setPageList(range(1, response.data.maxPage))
            setLoading(false)
        }
        fetchPost();
    }, [])
    const changePage = async (num) => {
        setLoading(true)
        setPage(num)
        const { data: response } = await axios.get(`/api/users?page=${num}`)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage))
        setLoading(false)
    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={'문의 관리'} />
                    {loading ?
                        <>
                            <Loading />
                        </>
                        :
                        <>
                            <DataTable data={posts} column={zColumn} schema={'user'} />
                        </>}

                    {/* <MBottomContent>
                        <div />
                        <PageContainer>
                            <PageButton onClick={() => changePage(1)}>
                                처음
                            </PageButton>
                            {pageList.map((item, index) => (
                                <>
                                    <PageButton onClick={() => changePage(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}` }}>
                                        {item}
                                    </PageButton>
                                </>
                            ))}
                            <PageButton onClick={() => changePage(pageList.length)}>
                                마지막
                            </PageButton>
                        </PageContainer>
                        <AddButton onClick={() => navigate(`/manager/user/0`)}>+ 추가</AddButton>
                    </MBottomContent> */}
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MInquiryList;
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

const MMasterList = () => {
    const navigate = useNavigate();
    const zColumn = [
        { name: '프로필이미지', width: 16, type: 'img', column: 'profile_img' }, 
        { name: '아이디', width: 16, type: 'text', column: 'id' }, 
        { name: '이름', width: 16, type: 'text', column: 'name' }, 
        { name: '생성시간', width: 28, type: 'text', column: 'date' }, 
        { name: '수정', width: 12, type: 'edit', column: 'edit' }, 
        { name: '삭제', width: 12, type: 'delete', column: 'delete' }];
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [pageList, setPageList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get(`/api/users?page=1&level=30`)
            console.log(response)
            setPosts(response.data.data)
            setPageList(range(1, response.data.maxPage))
            setLoading(false)
        }
        fetchPost();
    }, [])
    const changePage = async (num) => {
        setLoading(true);
        setPage(num);
        const { data: response } = await axios.get(`/api/users?page=${num}&level=30`);
        setPosts(response.data.data);
        setPageList(range(1, response.data.maxPage));
        setLoading(false);
    }

    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={'전문가 관리'} />
                    {loading ?
                        <>
                            <Loading />
                        </>
                        :
                        <>
                            <DataTable data={posts} column={zColumn} schema={'user'} />
                        </>}

                    <MBottomContent>
                        <div />
                        <PageContainer>
                            <PageButton onClick={() => changePage(1)}>
                                처음
                            </PageButton>
                            {pageList.map((item, index) => (
                                <>
                                    <PageButton onClick={() => changePage(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.manager.background1 : ''}` }}>
                                        {item}
                                    </PageButton>
                                </>
                            ))}
                            <PageButton onClick={() => changePage(pageList.length)}>
                                마지막
                            </PageButton>
                        </PageContainer>
                        <AddButton onClick={() => navigate(`/manager/master/0`)}>+ 추가</AddButton>
                    </MBottomContent>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MMasterList;
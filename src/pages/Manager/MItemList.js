import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
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

import { objManagerListContent } from '../../data/Data';

const MItemList = () => {

    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [zColumn, setZColumn] = useState([])
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [pageList, setPageList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setZColumn(objManagerListContent[`${params.table}`].zColumn ?? {})
        async function fetchPost() {
            setLoading(true)
            let str = '';
            if (params.table == 'master') {
                str = `/api/users?page=1&level=30`
            } else if (params.table == 'user') {
                str = `/api/users?page=1&level=0`
            } else if (params.table == 'issue' && params.pk) {
                str = `/api/items?table=issue&page=1&category_pk=${params.pk}`
            } else {
                let auth = JSON.parse(localStorage.getItem('auth'))
                str = `/api/items?table=${params.table}&page=1`
                if (auth?.user_level < 40) {
                    str += `&user_pk=${auth.pk}`
                }

            }
            const { data: response } = await axios.get(str)
            setPosts(response.data.data)
            setPageList(range(1, response.data.maxPage))
            setLoading(false)
        }
        fetchPost();
    }, [pathname])
    const changePage = async (num) => {
        setLoading(true)
        setPage(num)
        let str = '';
        if (params.table == 'master') {
            str = `/api/users?page=${num}&level=30`
        } else if (params.table == 'user') {
            str = `/api/users?page=${num}&level=0`
        } else if (params.table == 'issue' && params.pk) {
            str = `/api/items?table=issue&page=${num}$category_pk=${params.pk}`
        } else {
            str = `/api/items?table=${params.table}&page=${num}`
        }
        const { data: response } = await axios.get(str)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage))
        setLoading(false)
    }

    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={objManagerListContent[`${params.table}`].breadcrumb + '관리'} />
                    {loading ?
                        <>
                            <Loading />
                        </>
                        :
                        <>
                            <DataTable data={posts} column={zColumn} schema={params.table} />
                        </>}

                    <MBottomContent>
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
                            <PageButton onClick={() => changePage(pageList.length ?? 1)}>
                                마지막
                            </PageButton>
                        </PageContainer>
                        <AddButton onClick={() => navigate(`/manager/edit/${params.table}/0`)}>+ 추가</AddButton>
                    </MBottomContent>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MItemList;
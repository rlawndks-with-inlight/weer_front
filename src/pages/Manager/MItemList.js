import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useCallback } from 'react';
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
import { Row, Select, Input } from '../../components/elements/ManagerTemplete';
import { objManagerListContent } from '../../data/Data';
import $ from 'jquery';
import { AiOutlineSearch } from 'react-icons/ai'

const OptionCardWrappers = styled.div`
width:95%;
margin:0.5rem auto;
border-spacing: 0 10px;
min-width:700px;
box-shadow:1px 1px 1px #00000029;
font-size:14px;
background:#fff;
color:${props => props.theme.color.manager.font2};
`
const MItemList = () => {

    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [zColumn, setZColumn] = useState([])
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [pageList, setPageList] = useState([])
    const [loading, setLoading] = useState(false)
    const [isUseLoading, setIsUseLoading] = useState(true)
    useEffect(() => {
        setZColumn(objManagerListContent[`${params.table}`].zColumn ?? {})
        async function fetchPost() {
            setLoading(true)
            $('.page-cut').val(15)
            setPage(1)
            let str = '';
            if (params.table == 'master') {
                str = `/api/users?page=1&level=30`
            } else if (params.table == 'channel') {
                str = `/api/users?page=1&level=25`
            } else if (params.table == 'user') {
                str = `/api/users?page=1&level=0`
            } else if ((params.table == 'issue' || params.table == 'feature') && params.pk) {
                str = `/api/items?table=${params.table}&page=1&category_pk=${params.pk}`
            } else {
                let auth = JSON.parse(localStorage.getItem('auth'))
                str = `/api/items?table=${params.table}&page=1`
                if (auth?.level < 40) {
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
        } else if (params.table == 'channel') {
            str = `/api/users?page=${num}&level=25`
        } else if (params.table == 'user') {
            str = `/api/users?page=${num}&level=0`
        } else if ((params.table == 'issue' || params.table == 'feature') && params.pk) {
            str = `/api/items?table=${params.table}&page=${num}&category_pk=${params.pk}`
        } else {
            str = `/api/items?table=${params.table}&page=${num}`
        }
        str += `&page_cut=${parseInt($('.page-cut').val())}`;
        const { data: response } = await axios.get(str)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage))
        setLoading(false)
    }
    const onchangeSelectPageCut = (e) => {
        changePage(page)
    }
    const opTheTopItem = useCallback(async (pk, schema) => {
        if (window.confirm('가장 위로 올리겠습니까?')) {
            const { data: response } = await axios.post('/api/onthetopitem', { table: schema, pk: pk });
            if (response.result > 0) {
                changePage(page)
            } else {
                alert(response.message)
            }
        }
    })
    const changeItemSequence = useCallback(async (pk, schema, idx) => {
        console.log(pk)
        console.log(schema)
        console.log(idx)
        console.log(posts[idx].pk)
        if (posts[idx].pk == pk) {
            return;
        } else {
            const { data: response } = await axios.post('/api/changeitemsequence', {
                pk: pk,
                table: schema,
                change_pk: posts[idx].pk
            });
            if (response.result > 0) {
                changePage(page)
            } else {
                alert('잘못된 값입니다.')
                changePage(page)
            }
        }
    })
    const deleteItem = useCallback(async (pk, schema) => {
        let obj = {
            pk: pk,
            table: schema
        }
        if (schema == 'master' || schema == 'channel') {
            obj.table = 'user';
        }
        const { data: response } = await axios.post(`/api/deleteitem`, obj)

        if (response.result > 0) {
            alert('has been deleted');
            changePage(page)
        } else {
            alert('error')
        }
    })

    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={objManagerListContent[`${params.table}`].breadcrumb + '관리'} />
                    <div style={{ overflowX: 'auto' }}>
                        {/* 옵션카드 */}
                        <OptionCardWrappers>
                            <Row>
                                <div style={{ display: 'flex', alignItems: 'center',marginLeft:'auto' }}>
                                    <Input style={{ margin: '12px 0 12px 24px', border: 'none' }} className='search' placeholder='두 글자 이상 입력해주세요.' />
                                    <AiOutlineSearch className='search-button' style={{ padding: '14px', cursor: 'pointer' }} />
                                </div>
                                <Select className='page-cut' style={{ margin: '12px 24px 12px 24px' }} onChange={onchangeSelectPageCut}>
                                    <option value={15}>15개</option>
                                    <option value={20}>20개</option>
                                    <option value={30}>30개</option>
                                </Select>

                            </Row>

                        </OptionCardWrappers>
                    </div>
                    {loading ?
                        <>
                            <Loading />
                        </>
                        :
                        <>

                            <DataTable data={posts} column={zColumn} schema={params.table} opTheTopItem={opTheTopItem} changeItemSequence={changeItemSequence} deleteItem={deleteItem} />
                        </>}

                    <MBottomContent>
                        <div />
                        <PageContainer>
                            <PageButton onClick={() => changePage(1)}>
                                처음
                            </PageButton>
                            {pageList.map((item, index) => (
                                <>
                                    <PageButton onClick={() => changePage(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
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
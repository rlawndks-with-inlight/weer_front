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
import { commarNumber, range, returnMoment } from '../../functions/utils';
import AddButton from '../../components/elements/button/AddButton';
import Loading from '../../components/Loading';
import theme from '../../styles/theme';
import { Row, Select, Input } from '../../components/elements/ManagerTemplete';
import { objManagerListContent } from '../../data/Data';
import $ from 'jquery';
import { AiOutlineSearch } from 'react-icons/ai'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
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
const SearchContainer = styled.div`
display: flex; 
align-items: center;
margin-left: auto;
@media screen and (max-width:700px) {
    margin-left: 0;
}
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
    const [isUseLoading, setIsUseLoading] = useState(true);
    const [userCount, setUserCount] = useState(0);
    const [yearList, setYearList] = useState([])
    const month_list = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const [statisticsType, setStatisticsType] = useState('month')
    const notAddList = [
        'comment', 'all', 'user_statistics', 'hate_user', 'hate_comment'
    ]
    useEffect(() => {
        setZColumn(objManagerListContent[`${params.table}`].zColumn ?? {})
        async function fetchPost() {
            setLoading(true)
            if ((params.table == 'master' || params.table == 'channel' || params.table == 'user' || params.table == 'user_statistics' || params.table == 'setting' || params.table == 'issue_category' || params.table == 'feature_category')) {
                if (JSON.parse(localStorage.getItem('auth'))?.user_level < 40) {
                    navigate(-1);
                }
            }
            $('.page-cut').val(15)
            let str = '';
            if (params.table == 'master') {
                str = `/api/users?page=1&level=30`
            } else if (params.table == 'channel') {
                str = `/api/users?page=1&level=25`
            } else if (params.table == 'user') {
                str = `/api/users?page=1`
            } else if (params.table == 'hate_comment') {
                str = `/api/items?table=hate&type=0&order=pk&page=1`
            } else if (params.table == 'hate_user') {
                str = `/api/items?table=hate&type=1&order=pk&page=1`
            } else if ((params.table == 'issue' || params.table == 'feature') && params.pk) {
                str = `/api/items?table=${params.table}&page=1&category_pk=${params.pk}`
            } else if (params.table == 'comment') {
                str = `/api/items?table=${params.table}&page=1&order=pk`
            } else if (params.table == 'all') {
                str = `/api/getallposts?page=1&order=date`
            } else if (params.table == 'prohibit_comment') {
                str = `/api/items?table=prohibit_comment&page=1&order=pk`
            } else if (params.table == 'user_statistics') {
                const { data: count_response } = await axios.get('/api/itemcount?table=user');
                setUserCount(count_response?.data?.count ?? 0);
                let year = parseInt(returnMoment().substring(0, 4));
                let year_list = [];
                for (var i = 0; i < 10; i++) {
                    if (year - i >= 2022) {
                        year_list.push(year - i);
                    }
                }
                setYearList(year_list)
                str = `/api/getuserstatistics?page=1&type=${$('.statistics-type').val()}&year=${year}`
            } else {
                let auth = JSON.parse(localStorage.getItem('auth'))
                str = `/api/items?table=${params.table}&page=1`
                if (auth?.user_level < 40) {
                    str += `&user_pk=${auth.pk}`
                }
            }
            const { data: response } = await axios.get(str);
            setPosts(response.data.data);
            setPageList(range(1, response.data.maxPage));
            setLoading(false);
        }
        fetchPost();
    }, [pathname])
    const changePage = async (num) => {
        setLoading(true)
        setPage(num)
        let keyword = $('.search').val();
        let str = '';
        if (params.table == 'master') {
            str = `/api/users?level=30&`
        } else if (params.table == 'channel') {
            str = `/api/users?level=25&`
        } else if (params.table == 'user') {
            str = `/api/users?${$('.user-type').val() >= 0 ? `userType=${$('.user-type').val()}&` : ''}${$('.user-level').val() == '#' ? '' : `userLevel=${$('.user-level').val()}&`}`
        } else if (params.table == 'hate_comment') {
            str = `/api/items?table=hate&type=0&order=pk&`
        } else if (params.table == 'hate_user') {
            str = `/api/items?table=hate&type=1&order=pk&`
        } else if ((params.table == 'issue' || params.table == 'feature') && params.pk) {
            str = `/api/items?table=${params.table}&category_pk=${params.pk}&`
        } else if (params.table == 'comment') {
            str = `/api/items?table=${params.table}&order=pk&`
        } else if (params.table == 'all') {
            str = `/api/getallposts?order=date&`
        }else if (params.table == 'prohibit_comment') {
            str = `/api/items?table=prohibit_comment&order=pk&`
        } else if (params.table == 'user_statistics') {
            str = `/api/getuserstatistics?type=${$('.statistics-type').val()}&year=${$('.statistics-year').val()}&month=${$('.statistics-month').val() ?? parseInt(returnMoment().substring(5, 7))}&`
        } else {
            str = `/api/items?table=${params.table}&`
        }
        str += `page_cut=${parseInt($('.page-cut').val())}&keyword=${keyword}&page=${num}`;
        const { data: response } = await axios.get(str)
        setPosts(response.data.data)
        setPageList(range(1, response.data.maxPage))
        setLoading(false)
    }
    const onChangeSelectPageCut = (e) => {
        changePage(page)
    }
    const onChangeStatisticsType = (e) => {
        setStatisticsType(e.target.value)
        changePage(1)
    }
    const onChangeStatisticsYear = (e) => {
        changePage(1)
    }
    const onChangeStatisticsMonth = (e) => {
        changePage(1)
    }
    const onChangeUserType = (e) => {
        changePage(1)
    }
    const onChangeUserLevel = (e) => {
        changePage(1)
    }
    const opTheTopItem = useCallback(async (pk, sort, schema) => {
        if (window.confirm('가장 위로 올리겠습니까?')) {
            const { data: response } = await axios.post('/api/onthetopitem', { table: schema, pk: pk, sort: sort });
            if (response.result > 0) {
                changePage(page)
            } else {
                alert(response.message)
            }
        }
    })
    const changeItemSequence = useCallback(async (pk, sort, schema, idx) => {
        if (posts[idx].pk == pk) {
            return;
        } else {
            const { data: response } = await axios.post('/api/changeitemsequence', {
                pk: pk,
                sort: sort,
                table: schema,
                change_pk: posts[idx].pk,
                change_sort: posts[idx].sort
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
            alert('삭제 되었습니다.');
            changePage(page)
        } else {
            alert('error')
        }
    })
    const exportExcel = async () => {
        let str = '';
        if (params.table == 'master') {
            str = `/api/users?level=30`
        } else if (params.table == 'channel') {
            str = `/api/users?level=25`
        } else if (params.table == 'user') {
            str = `/api/users?level=0`
        } else if (params.table == 'hate_comment') {
            str = `/api/items?table=hate&type=0&order=pk`
        } else if (params.table == 'hate_user') {
            str = `/api/items?table=hate&type=1&order=pk`
        } else if ((params.table == 'issue' || params.table == 'feature') && params.pk) {
            str = `/api/items?table=${params.table}&category_pk=${params.pk}`
        } else if (params.table == 'all') {
            str = `/api/getallposts?order=date`
        } else if (params.table == 'user_statistics') {
            str = `/api/getuserstatistics?type=${$('.statistics-type').val()}&year=${$('.statistics-year').val()}&month=${$('.statistics-month').val() ?? parseInt(returnMoment().substring(5, 7))}`
        } else {
            str = `/api/items?table=${params.table}`
        }
        const { data: response } = await axios.get(str)
        excelDownload(response.data);

    }
    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelFileName = params.table;

    const excelDownload = (excelData) => {
        let ignore_name_list = ['맨위로', '수정', '삭제'];
        let ignore_column_list = ['', 'edit', 'delete'];
        let name_list = [];
        let column_list = [];
        for (var i = 0; i < objManagerListContent[`${params.table}`].zColumn.length; i++) {
            if (!ignore_name_list.includes(objManagerListContent[`${params.table}`].zColumn[i].name)) {
                name_list.push(objManagerListContent[`${params.table}`].zColumn[i].name)
                column_list.push(objManagerListContent[`${params.table}`].zColumn[i].column)
            }
        }
        const ws = XLSX.utils.aoa_to_sheet([
            ['weare']
            , []
            , name_list
        ]);
        excelData.map((data) => {
            XLSX.utils.sheet_add_aoa(
                ws,
                [
                    column_list.map(item => {
                        return data[`${item}`]
                    })
                ],
                { origin: -1 }
            );
            ws['!cols'] = [
                { wpx: 200 },
                { wpx: 200 }
            ]
            return false;
        });
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelFile = new Blob([excelButter], { type: excelFileType });
        FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
    }
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
                                {params.table == 'user' ?
                                    <>
                                        <Select className='user-type' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeUserType}>
                                            <option value={-1}>전체</option>
                                            <option value={0}>일반</option>
                                            <option value={1}>카카오</option>
                                            <option value={2}>네이버</option>
                                            <option value={3}>애플</option>
                                        </Select>
                                        <Select className='user-level' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeUserLevel}>
                                            <option value={'#'}>전체</option>
                                            <option value={-10}>불량회원</option>
                                            <option value={0}>일반회원</option>
                                            <option value={30}>전문가</option>
                                            <option value={40}>관리자</option>
                                        </Select>
                                    </>
                                    :
                                    <>
                                    </>}
                                {params.table == 'user_statistics' ?
                                    <>
                                        <Select className='statistics-type' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeStatisticsType}>
                                            <option value={'month'}>월별 요약</option>
                                            <option value={'day'}>일차별 요약</option>
                                        </Select>
                                        <Select className='statistics-year' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeStatisticsYear}>
                                            {yearList.map((item, index) => (
                                                <>
                                                    <option value={item}>{`${item}년`}</option>
                                                </>
                                            ))}
                                        </Select>
                                        {statisticsType == 'day' ?
                                            <>
                                                <Select className='statistics-month' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeStatisticsMonth}>
                                                    {month_list.map((item) => (
                                                        <>
                                                            {`${$('.statistics-year').val()}-${item < 10 ? '0' + item : item}` <= returnMoment().substring(0, 7) ?
                                                                <>
                                                                    <option value={item}>{`${item}월`}</option>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                            }
                                                        </>
                                                    ))}
                                                </Select>
                                            </>
                                            :
                                            <>
                                            </>
                                        }

                                    </>
                                    :
                                    <>
                                    </>
                                }
                                {params.table != 'user_statistics' ?
                                    <>
                                        <SearchContainer>
                                            <Input style={{ margin: '12px 0 12px 24px', border: 'none' }} className='search' placeholder='두 글자 이상 입력해주세요.' onKeyPress={(e) => { e.key == 'Enter' ? changePage(1) : console.log("") }} />
                                            <AiOutlineSearch className='search-button' style={{ padding: '14px', cursor: 'pointer' }} onClick={() => changePage(1)} />
                                        </SearchContainer>
                                    </>
                                    :
                                    <>
                                    </>
                                }

                                <Select className='page-cut' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeSelectPageCut}>
                                    <option value={15}>15개</option>
                                    <option value={20}>20개</option>
                                    <option value={30}>30개</option>
                                </Select>

                                <AddButton style={{ margin: '12px 24px 12px 24px', width: '96px', alignItems: 'center', display: 'flex', justifyContent: 'space-around' }} onClick={exportExcel}><SiMicrosoftexcel /> 액셀추출</AddButton>

                            </Row>

                        </OptionCardWrappers>
                        {params.table == 'user_statistics' ?
                            <>
                                <OptionCardWrappers>
                                    <div style={{ padding: '12px 24px' }}>전체 사용자: {commarNumber(userCount)}명</div>
                                </OptionCardWrappers>
                            </>
                            :
                            <>
                            </>}

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
                        {notAddList.includes(params.table) ?
                            <>
                                <div />
                            </>
                            :
                            <>
                                <AddButton onClick={() => navigate(`/manager/edit/${params.table}/0`)}>+ 추가</AddButton>
                            </>
                        }
                    </MBottomContent>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MItemList;
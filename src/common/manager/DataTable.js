import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { CgToggleOn, CgToggleOff } from 'react-icons/cg'
import axios from 'axios';
import theme from '../../styles/theme';
import { backUrl } from '../../data/Data';
import $ from 'jquery'
const Table = styled.table`
width:95%;
margin:0 auto;
border-spacing: 0 10px;
min-width:700px;
`
const Tr = styled.tr`
box-shadow:1px 1px 1px #00000029;
font-size:14px;
background:#fff;
color:${props => props.theme.color.manager.font2};

`
const Td = styled.td`
text-align:center;
padding:14px 0;
margin-bottom:6px;
`
const DataTable = (props) => {
    const navigate = useNavigate();
    const [zStatus, setZStatus] = useState([]);
    useEffect(() => {
        let list = [];
        for (var i = 0; i < props.data.length; i++) {
            list[i] = props.data[i].status;
        }
        setZStatus(list);
    }, [])

    const deleteItem = async (pk, schema) => {
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
            window.location.reload();
        } else {
            alert('error')
        }
    }


    const changeStatus = async (num, idx, pk) => {
        let list = [...zStatus];
        if (num == 1) {
            list[idx] = 0;
        } else {
            list[idx] = 1;
        }
        setZStatus(list)
        const { data: response } = await axios.post('/api/updatestatus', {
            table: props.schema,
            pk: pk,
            num:num
        })
    }

    return (
        <>
            <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                <Table>
                    <Tr style={{ fontWeight: 'bold', background: `${theme.color.manager.background2}`, fontSize: '16px' }}>
                        {props.column.map((item, index) => (
                            <>
                                <Td style={{ width: `${item.width}%` }}>{item.name}</Td>
                            </>
                        ))}
                    </Tr>
                    {props.data.map((data, idx) => (
                        <>
                            <Tr>
                                {props.column.map((column, index) => (
                                    <>
                                        {column.type == 'text' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>{data[`${column.column}`]}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'link' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { window.open(data[`${column.column}`]) }}>{data[`${column.column}`]}</Td>
                                            </>
                                            :
                                            <>
                                            </>}

                                        {column.type == 'level' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>{data[column.column] == 0 ? '일반유저' : data[column.column] == 40 ? '관리자' : data[column.column] == 30 ? '대가' : '개발자'}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'img' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>
                                                    {data[`${column.column}`] ?
                                                        <>
                                                            <img src={backUrl + data[`${column.column}`]} style={{ height: '5rem' }} />
                                                        </>
                                                        :
                                                        <>
                                                            ---
                                                        </>}
                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'status' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, fontSize: '28px' }}>
                                                    {zStatus[idx] > 0 ?
                                                        <CgToggleOn style={{ color: `${theme.color.background1}`, cursor: 'pointer' }} onClick={() => { changeStatus(1, idx, props?.data[idx]?.pk) }} /> :
                                                        <CgToggleOff style={{ color: '#aaaaaa', cursor: 'pointer' }} onClick={() => { changeStatus(0, idx, props?.data[idx]?.pk) }} />}
                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'edit' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, fontSize: '20px' }}>
                                                    <BiEditAlt style={{ cursor: 'pointer', color: '#546de5' }} onClick={() => navigate(`/manager/edit/${props.schema}/${data.pk}`)} />
                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'delete' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, fontSize: '20px' }}>
                                                    <RiDeleteBinLine style={{ cursor: 'pointer', color: '#e15f41' }} onClick={() => {
                                                        if (window.confirm("Do you want to delete?")) {
                                                            deleteItem(data.pk, props.schema)
                                                        }
                                                    }} />
                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                    </>
                                ))}

                            </Tr>

                        </>
                    ))}
                </Table>
            </div>

        </>
    )
}
export default DataTable;
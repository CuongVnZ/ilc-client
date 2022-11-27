import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

import { userRequest, updateToken } from "../requestMethods";
import BusyLoading from '../components/BusyLoading';

const columns = [
  { id: '_id', label: 'ID', minWidth: 170 },
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'amount',
    label: 'Total',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];


const Container = styled.div``;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    margin-bottom: 10px;
`;

const Wrapper = styled.div`
    padding: 5%;
    `;

export default function Profile() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState("show");

    const user = useSelector(state => state.user.currentUser)
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  
    useEffect(() => {
        const getOrders = async () => {
            try {
                setLoading(<BusyLoading/>)
                const res = await userRequest.get("orders/find/" + user._id);
                setOrders(res.data);
                setLoading(null)
            } catch (err) {
                console.log(err)
            }
        };
        getOrders();
    }, [setLoading, setOrders, user]);

    return (
        <>
        <Container>
            <Announcement />
            <Navbar />
            {loading}
            <Wrapper>
                <Title>ORDERS HISTORY</Title>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                            })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Wrapper>
        </Container>
        </>
    )
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import instance from '../../services/axiosOrder';
import { useState, useEffect } from 'react';

import alertSuccess from '../../common/function';

export default function CarTable({ carArray, loadData }) {

    const makeApproval = (reservationId)=>{
        console.log("hooo");
        console.log(reservationId);
        
        instance.put('/reservation/approve/'+reservationId, {
      
          })
          .then(function (response) {
           
            console.log(response.data);
            console.log("xxx");
            loadData()
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Customer Contact</TableCell>
                        <TableCell>Car Id</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carArray.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.customer.name}</TableCell>
                            <TableCell>{row.customer.contact}</TableCell>
                            <TableCell>{row.car.id}</TableCell>
                            <TableCell>{row.reservationStartDate}</TableCell>
                            <TableCell>{row.reservationEndDate}</TableCell>
                            <TableCell>
                                <Button onClick={()=>{makeApproval(row.id)}} sx={{ margin: '5px' }} variant="contained">Approve</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

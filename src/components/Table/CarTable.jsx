import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Autocomplete } from '@mui/material';
import instance from '../../services/axiosOrder';

const filterOptions = [
    { label: 'to approve' },
    { label: 'to burrow' },
    { label: 'to handover' },
];

export default function CarTable({ carArray, loadData }) {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleButtonClick = (action, reservationId) => {
        const urlMap = {
            approve: `/reservation/approve/${reservationId}`,
            burrowed: `/reservation/status/${reservationId}/burrowed`,
            handover: `/reservation/status/${reservationId}/handover`,
        };

        instance.put(urlMap[action], {})
            .then(function (response) {
                loadData();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const filterRows = (row) => {
        if (!selectedFilter) return true;
        switch (selectedFilter.label) {
            case 'to approve':
                return !row.approved;
            case 'to burrow':
                return row.approved && row.status !== 'burrowed' && row.status !== 'handover';
            case 'to handover':
                return row.status === 'burrowed';
            default:
                return true;
        }
    };

    const filteredCarArray = carArray.filter(filterRows);

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={filterOptions}
                sx={{ width: 300, marginBottom: 2 }}
                onChange={(event, newValue) => setSelectedFilter(newValue)}
                renderInput={(params) => <TextField {...params} label="filter" />}
            />
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
                        {filteredCarArray.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.customer.name}</TableCell>
                                <TableCell>{row.customer.contact}</TableCell>
                                <TableCell>{row.car.id}</TableCell>
                                <TableCell>{row.reservationStartDate}</TableCell>
                                <TableCell>{row.reservationEndDate}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleButtonClick('approve', row.id)}
                                        sx={{ margin: '5px' }}
                                        variant="contained"
                                        disabled={row.approved}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => handleButtonClick('burrowed', row.id)}
                                        sx={{ margin: '5px' }}
                                        variant="contained"
                                        disabled={row.status === 'burrowed' || row.status === 'handover'}
                                    >
                                        Burrowed
                                    </Button>
                                    <Button
                                        onClick={() => handleButtonClick('handover', row.id)}
                                        sx={{ margin: '5px' }}
                                        variant="contained"
                                        disabled={row.status === 'handover'}
                                    >
                                        HandOvered
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

import React, { useEffect, useState } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import instance from '../../services/axiosOrder';
import alertSuccess from '../../common/function';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [token,setToken] = useState("")

    useEffect(()=>{
        console.log(token);
    },[token])

    const login = () => {
        if (name === '' || password === '' ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Missing Data!',
            });
        } else {
            instance.post('/admin/authenticate', {
                name: name,
                password: password,
                roles:"admin"
            })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('login', res.data.token);
                setToken(localStorage.getItem('login'))

             

                alertSuccess.fire({
                    icon: 'success',
                    title: 'Sign in successfully',
                });
                setTimeout(() => { window.location.reload() }, 2000);
            })
            .catch((err) => {
                // console.log(err);
                alertSuccess.fire({
                    icon: 'error',
                    title: 'Sign in fail',
                });
            });
        }
    };


    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '400px',
                margin: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                Login
            </Typography>
            <TextField
                sx={{ margin: '10px 0', width: '100%' }}
                label="user name"
                variant="outlined"
                onChange={(val) => setName(val.target.value)}
            />
            <TextField
                sx={{ margin: '10px 0', width: '100%' }}
                label="Password"
                variant="outlined"
                type="password"
                onChange={(val) => setPassword(val.target.value)}
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Link to="/registre" style={{ textDecoration: 'none' }}>
                    <Button variant="text">Register</Button>
                </Link>
                <Button variant="contained" onClick={login}>
                    Login
                </Button>
            </Box>
        </Box>
    )
}
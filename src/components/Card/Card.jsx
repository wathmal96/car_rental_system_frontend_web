import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Modal1 from '../Model/Modal1';
import instance from '../../services/axiosOrder';
import alertSuccess from '../../common/function';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import { useState,useEffect } from 'react';

export default function Card({ model, price, image, children,id,dataForUpdate,loadData}) {

    const [open, setOpen] = useState(false);
    // const [dataForUpdate, setDataForUpdate] = useState({})

    const deleteCar = (id) => {
        instance.delete('car/delete/' + id)
            .then((res) => {
                alertSuccess.fire({
                    icon: 'success',
                    title: 'delete car successfully',
                });
                loadData();
            })
            .catch((err) => console.log(err));
    }
    const update = async (carData) => {
        await instance.put("/car/update/" + dataForUpdate.id, carData);
    }

    return (
        <>

            <Box sx={{
                margin: "10px",
                border: "none",
                width: "500px",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                cursor: "pointer",
                transition: "transform 1s",
                backgroundColor: "#121070",
                color: "white",
                ":hover": {
                    transform: "scale(0.95)"
                }
            }}

            >
                <PhotoProvider>
                    {children}
                </PhotoProvider>

                <Typography variant="h6" gutterBottom>
                    model:{model}
                </Typography>

                <Typography variant="h6" gutterBottom>
                    price:{price}
                </Typography>

                <Button onClick={() => { setOpen(true)}} sx={{ margin: '5px' }} variant="contained">More...</Button>
                <Button onClick={() => deleteCar(id)} sx={{ margin: '5px' }} variant="contained">Delete</Button>

            </Box>

            {
                open &&
                <Modal1 defaultData={dataForUpdate} open={open} handleClose={() => setOpen(false)} loadData={loadData} tstFn={update} setOpen={setOpen} modelAction={"update"} />
            }

        </>

    )
}

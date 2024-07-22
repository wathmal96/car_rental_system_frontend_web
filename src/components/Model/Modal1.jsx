import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TextField } from '@mui/material';
import alertSuccess from '../../common/function';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Modal1({ open, handleClose, loadData, tstFn, defaultData, setOpen, modelAction }) {
    const [model, setModel] = useState(defaultData.model)
    const [brand, setBrand] = useState(defaultData.brand)
    const [engineCap, setEngineCap] = useState(defaultData.engineCapacity)
    const [price, setPrice] = useState(defaultData.price)

    const addCar = () => {
        tstFn({
            model: model,
            brand: brand,
            engineCapacity: engineCap,
            price: price
        })
            .then((res) => {
                console.log(res)
                alertSuccess.fire({
                    icon: 'success',
                    title: modelAction + ' car successfully',
                });
                setOpen(false)
                loadData()
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <TextField value={model} onChange={(val) => setModel(val.target.value)} sx={{ margin: '5px' }} id="outlined-basic" label="Model" variant="outlined" />
                        <TextField value={brand} onChange={(val) => setBrand(val.target.value)} sx={{ margin: '5px' }} id="outlined-basic" label="Brand" variant="outlined" />
                        <TextField value={engineCap} onChange={(val) => setEngineCap(val.target.value)} sx={{ margin: '5px' }} id="outlined-basic" label="Engine-Capacity" variant="outlined" />
                        <TextField value={price} onChange={(val) => setPrice(val.target.value)} sx={{ margin: '5px' }} id="outlined-basic" label="Price" variant="outlined" />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button sx={{ margin: '5px' }} variant="contained" onClick={addCar}>{modelAction}</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

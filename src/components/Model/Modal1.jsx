import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import alertSuccess from '../../common/function';
import instance from '../../services/axiosOrder';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

export default function Modal1({ open, handleClose, loadData, tstFn, defaultData, setOpen, modelAction, children }) {
    const [model, setModel] = useState(defaultData.model || '');
    const [brand, setBrand] = useState(defaultData.brand || "");
    const [engineCap, setEngineCap] = useState(defaultData.engineCapacity || "");
    const [price, setPrice] = useState(defaultData.price || "");
    // const [files, setFiles] = useState([null, null, null]);

    const addCar = async () => {
        try {
            // const formData = new FormData();
            // // First, upload the images
            // const imageUploadPromises = files.map(async (file, index) => {
            //     if (file) {

            //         formData.append('image', file);

            //     }
            // });

            // if (defaultData.images.length === 0) {
            //     await instance.post(`/car/upload_file_path_by_car_id/${defaultData.id}`, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     });
            //     console.log("posted");
            // }
            // else {
            //     await instance.put(`/car/update_file_path_by_car_id/${defaultData.id}`, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     });
            //     console.log("updated");
            // }



            // Now, submit the other form data along with the image URLs
            const carData = {
                model,
                brand,
                engineCapacity: engineCap,
                price
            };

            await tstFn(carData);

            alertSuccess.fire({
                icon: 'success',
                title: modelAction + ' car successfully',
            });
            setOpen(false);
            loadData();
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    // const handleFileChange = (event, index) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setFiles(prevFiles => {
    //             const newFiles = [...prevFiles];
    //             newFiles[index] = file;
    //             return newFiles;
    //         });
    //     }
    // };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    {/* <Box>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {files.map((file, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: '30%',
                                        height: 150,
                                        position: 'relative',
                                        border: '1px dashed #ccc',
                                        backgroundColor: '#f0f0f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        borderRadius: 2
                                    }}
                                >
                                    {file ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Uploaded ${index}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    ) :
                                        (
                                            defaultData.images[index] ? (
                                                <img
                                                    src={`http://localhost:8080/assets/${defaultData.images[index].filePath}`}
                                                    alt={`Uploaded ${index}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            ) :
                                                (
                                                    <Box sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <span>No image uploaded</span>
                                                    </Box>
                                                )
                                        )

                                    }
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: 2 }}>
                            {files.map((_, index) => (
                                <Box key={index} sx={{ width: '30%' }}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        fullWidth
                                    >
                                        Upload Image {index + 1}
                                        <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event, index)} />
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Box> */}

                    <Box>
                        {children}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                        <TextField value={model} onChange={(val) => setModel(val.target.value)} label="Model" variant="outlined" fullWidth />
                        <TextField value={brand} onChange={(val) => setBrand(val.target.value)} label="Brand" variant="outlined" fullWidth />
                        <TextField value={engineCap} onChange={(val) => setEngineCap(val.target.value)} label="Engine Capacity" variant="outlined" fullWidth />
                        <TextField value={price} onChange={(val) => setPrice(val.target.value)} label="Price" variant="outlined" fullWidth />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="contained" onClick={addCar}>{modelAction}</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

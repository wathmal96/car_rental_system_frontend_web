import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import alertSuccess from '../../common/function';
import instance from '../../services/axiosOrder';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ImageLoader({ defaultData, loadData }) {
    const [files, setFiles] = useState([null, null, null]);
    const [error, setError] = useState('');

    const addCar = async () => {
        if (defaultData.images.length === 0) {
            // Check if it's a POST request and if all three images are mandatory
            if (files.some(file => file === null)) {
                setError('All three images are mandatory.');
                return;
            }
        } else {
            // Check if at least one image is provided for the PUT request
            if (files.every(file => file === null)) {
                setError('At least one image must be provided to update.');
                return;
            }
        }

        setError('');

        try {
            const formData = new FormData();
            // Append files to formData
            files.forEach(file => {
                if (file) {
                    formData.append('image', file);
                }
            });

            if (defaultData.images.length === 0) {
                await instance.post(`/car/upload_file_path_by_car_id/${defaultData.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log("posted");
            } else {
                await instance.put(`/car/update_file_path_by_car_id/${defaultData.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log("updated");
            }

            alertSuccess.fire({
                icon: 'success',
                title: 'Images uploaded successfully',
            });

            loadData();
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            setFiles(prevFiles => {
                const newFiles = [...prevFiles];
                newFiles[index] = file;
                return newFiles;
            });
        }
    };

    return (
        <Box>
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
                        ) : (
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
                            ) : (
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
                        )}
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
                            Image {index + 1}
                            <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event, index)} />
                        </Button>
                    </Box>
                ))}
            </Box>
            {error && (
                <Box sx={{ color: 'red', marginTop: 2 }}>
                    {error}
                </Box>
            )}
            <Button onClick={addCar} sx={{ marginTop: 2 }} variant="text">Save images</Button>
        </Box>
    );
}

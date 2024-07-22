import Typography from '@mui/material/Typography';
import Card from '../../components/Card/Card';
import { PhotoView,PhotoProvider } from 'react-photo-view';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Modal1 from '../../components/Model/Modal1';
import instance from '../../services/axiosOrder';

export default function Car() {

    const [open, setOpen] = useState(false);

    const [cars, setCars] = useState([])
    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        console.log(cars);
    }, [cars])

    const loadData = () => {
        instance.get('/car/get_all')
            .then(function (response) {
                // handle success
                console.log(response.data);
                setCars(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const saveCar = async (carData) => {
        await instance.post("/car/save", carData)
    }


    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Button onClick={() => setOpen(true)}>Add Car</Button>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {
                    cars.map((val, index) => {
                        const imagePath = val.images[0] ? val.images[0].filePath : null;

                        return (
                            <Card key={index} model={val.model} price={val.price} id={val.id} dataForUpdate={val} loadData={loadData}>
                                {imagePath ? (
                                    <PhotoProvider>
                                        <PhotoView src={`http://localhost:8080/assets/${imagePath}`}>
                                            <img src={`http://localhost:8080/assets/${imagePath}`} alt={`Image of ${val.model}`} />
                                        </PhotoView>
                                    </PhotoProvider>

                                ) : (
                                    <p>No image available</p>
                                )}
                            </Card>
                        );
                    })
                }

            </Box>



            {open &&
                <Modal1 open={open} handleClose={() => setOpen(false)} setOpen={setOpen} modelAction={"add"} tstFn={saveCar} defaultData={{model:"",brand:"",engineCapacity:"",price:""}} loadData={loadData}/>
            }
        </>
    )
}
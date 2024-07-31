
import CarTable from '../../components/Table/CarTable';
import { useState,useEffect } from 'react';
import instance from '../../services/axiosOrder';


export default function Reservation() {

    const [cars, setCars] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        console.log(cars);
    }, [cars])

    const loadData = () => {
        instance.get('/reservation/get_all')
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

    return (
        <>
            <CarTable carArray={cars} loadData={loadData}/>
        </>
    )
}
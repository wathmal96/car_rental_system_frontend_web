import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Car from '../../pages/Car/Car';
import Reservation from '../../pages/Reservation/Reservation';


const routes = [
    {
        path:"/car",
        element:<Car/>,
        icon:< DirectionsCarIcon/>,
        text:"car"
    },
    {
        path:"/reservation",
        element:<Reservation/>,
        icon:< LibraryBooksIcon/>,
        text:"reservaion"
    }
]

export default routes;
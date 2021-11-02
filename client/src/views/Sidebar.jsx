import './home2.css'
import { Dashboard } from './Dashboard'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'


export const Sidebar = () => {

    return(
        <div className="main-content">
            <div className="sidebar active">
                <div className="sidebar-header"></div>
                <div className="sidebar-body">
                    <Link to="/home/new">
                    <IconButton  sx={{color: '#fff'}}>
                        <AddCircleIcon fontSize='large'/>
                    </IconButton>
                    </Link>
                    <Link to="/home">
                    <IconButton sx={{color: '#fff'}}>
                        <HomeIcon fontSize='large'/>
                    </IconButton>
                    </Link>
                    <Link to="/home/chart">
                    <IconButton sx={{color: '#fff'}}>
                        <HomeIcon fontSize='large'/>
                    </IconButton>
                    </Link>
                </div>
                <div className="sidebar-footer"></div>
            </div>
            <Dashboard/>
        </div>
    )
}
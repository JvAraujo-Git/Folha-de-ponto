import React from 'react';
import './Home.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

const Home = (props) => {
    return (
        <div style={{ width: '100%', height: '100%', }}>
            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                        Batidas de Ponto
                    </Typography>
                    <IconButton color="error" onClick={() => props.onLogout()}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div id="empty-list"
                style={{
                    width: '100%',
                    height: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img src="/assets/images/timesheet_calculator.svg" alt='empty-list' style={{ width: '50%', marginBottom: '1rem' }} />
                <Typography component="h1" variant="h5">
                    Nenhuma batida inserida!
                </Typography>
            </div>
        </div>
    )
}

export default Home;
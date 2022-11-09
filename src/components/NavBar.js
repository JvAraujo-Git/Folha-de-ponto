import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NavBar(props) {
    return (
        <AppBar position="sticky" style={{ width: '100vw', margin: '0 -16px 16px -16px' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Batidas de Ponto
                </Typography>
                <IconButton color="error" onClick={() => props.onLogout()}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
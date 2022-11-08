import React from 'react';
import Typography from '@mui/material/Typography';

export default function EmptyList() {
    return (
        <div
            style={{
                width: '100%',
                height: '85%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img src="/assets/images/timesheet_calculator.svg" alt='empty-list' style={{ width: '30%', marginBottom: '1rem' }} />
            <Typography component="h1" variant="h5">
                Nenhuma batida inserida!
            </Typography>
        </div>
    )
}
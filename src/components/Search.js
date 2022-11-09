import React from 'react';

import moment from 'moment';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function Search(props) {

    const filterClocks = (event) => {
        if (props.user?.clocks) {
            const searchValue = event.target.value;

            if (!searchValue) {
                props.user.searchClocks = [];
                props.onSetUser(props.user);
                return;
            }

            const userClocks = props.user?.clocks?.filter((clock) =>
                moment(clock.date)?.format('DD/MM/yyyy').toString().includes(searchValue) ||
                moment(clock.enterOne)?.format('HH:mm').toString().includes(searchValue) ||
                moment(clock.leaveOne)?.format('HH:mm').toString().includes(searchValue) ||
                moment(clock.enterTwo)?.format('HH:mm').toString().includes(searchValue) ||
                moment(clock.leaveTwo)?.format('HH:mm').toString().includes(searchValue)
            );

            if (userClocks) {
                props.user.searchClocks = userClocks;
            } else {
                props.user.searchClocks = [];
            }

            props.onSetUser(props.user);
        }
    }

    return (
        <TextField
            fullWidth
            variant="outlined"
            label="Buscar"
            placeholder='Buscar por data ou batida'
            onKeyUp={(event) => filterClocks(event)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}
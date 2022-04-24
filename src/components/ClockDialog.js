import React from 'react';

import moment from 'moment';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ClockDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [date, setDate] = React.useState(props?.clock?.date || null);
    const [enterOne, setEnterOne] = React.useState(props?.clock?.enterOne || null);
    const [leaveOne, setLeaveOne] = React.useState(props?.clock?.leaveOne || null);
    const [enterTwo, setEnterTwo] = React.useState(props?.clock?.enterTwo || null);
    const [leaveTwo, setLeaveTwo] = React.useState(props?.clock?.leaveTwo || null);

    const clockIn = () => {
        if (!date || !enterOne || !leaveOne || !enterTwo || !leaveTwo) {
            setOpen(true);
            return;
        }

        if (props.user?.clocks) {
            const index = props.user.clocks.findIndex((u) => u.date === date);
            props.user.clocks.splice(index, index >= 0 ? 1 : 0);
        }

        const user = { ...props.user };
        user.clocks.push({ date, enterOne, leaveOne, enterTwo, leaveTwo });

        user.clocks = user.clocks.sort((c1, c2) => {
            const dateOne = moment(c1.date);
            const dateTwo = moment(c2.date);

            return new Date(dateOne.year(), dateOne.month(), dateOne.date(), 0, 0, 0, 0) -
                new Date(dateTwo.year(), dateTwo.month(), dateTwo.date(), 0, 0, 0, 0);
        });

        props.onSetUser(user);

        props.onSetOpen(false);
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClickClose}
        >
            <DialogTitle id="alert-dialog-title">
                Batida de Ponto
                <IconButton
                    onClick={props.onClickClose}
                    style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        disabled={props.disableDate}
                        views={['day', 'month', 'year']}
                        inputFormat="DD/MM/yyyy"
                        label="Data"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        renderInput={(params) =>
                            <TextField {...params}
                                margin="normal"
                                id="date"
                                name="date"
                            />
                        }
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TimePicker
                                label="Entrada 1"
                                ampm={false}
                                openTo="hours"
                                views={['hours', 'minutes']}
                                inputFormat="HH:mm"
                                mask="__:__"
                                value={enterOne}
                                onChange={(newValue) => setEnterOne(newValue)}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        margin="normal"
                                        id="enter-one"
                                        name="enterOne"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker
                                label="Saída 1"
                                ampm={false}
                                openTo="hours"
                                views={['hours', 'minutes']}
                                inputFormat="HH:mm"
                                mask="__:__"
                                value={leaveOne}
                                onChange={(newValue) => setLeaveOne(newValue)}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        margin="normal"
                                        id="leave-one"
                                        name="leaveOne"
                                    />
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TimePicker
                                label="Entrada 2"
                                ampm={false}
                                openTo="hours"
                                views={['hours', 'minutes']}
                                inputFormat="HH:mm"
                                mask="__:__"
                                value={enterTwo}
                                onChange={(newValue) => setEnterTwo(newValue)}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        margin="normal"
                                        id="enter-two"
                                        name="enterTwo"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker
                                label="Saída 2"
                                ampm={false}
                                openTo="hours"
                                views={['hours', 'minutes']}
                                inputFormat="HH:mm"
                                mask="__:__"
                                value={leaveTwo}
                                onChange={(newValue) => setLeaveTwo(newValue)}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        margin="normal"
                                        id="leave-two"
                                        name="leaveTwo"
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>


            </DialogContent>
            <DialogActions>
                <Button onClick={clockIn} autoFocus>
                    Salvar
                </Button>
            </DialogActions>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Preencha o formulário corretamente!</Alert>
            </Snackbar>
        </Dialog>
    )
}
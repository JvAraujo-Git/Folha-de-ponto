import React from 'react';

import moment from 'moment';

import ClockDialog from './ClockDialog';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Clock(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const calculateTime = () => {
        const { enterOne, leaveOne, enterTwo, leaveTwo } = props.clock;

        const enterOneDate = new Date();
        enterOneDate.setHours(moment(enterOne).hour(), moment(enterOne).minute(), 0, 0);

        const leaveOneDate = new Date();
        leaveOneDate.setHours(moment(leaveOne).hour(), moment(leaveOne).minute(), 0, 0);

        const enterTwoDate = new Date();
        enterTwoDate.setHours(moment(enterTwo).hour(), moment(enterTwo).minute(), 0, 0);

        const leaveTwoDate = new Date();
        leaveTwoDate.setHours(moment(leaveTwo).hour(), moment(leaveTwo).minute(), 0, 0);

        const leaveTwoStartOneHour = leaveTwoDate.getTime() - enterOneDate.getTime();
        const enterTwoEndOneHour = enterTwoDate.getTime() - leaveOneDate.getTime();

        let difference = leaveTwoStartOneHour - enterTwoEndOneHour;
        difference = difference / 1000;

        const hourDifference = Math.floor(difference / 3600);
        difference -= hourDifference * 3600;

        const minuteDifference = Math.floor(difference / 60);
        difference -= minuteDifference * 60;

        return formatWithZero(hourDifference) + ':' + formatWithZero(minuteDifference);
    }

    const formatWithZero = (value) => {
        return value.toString().length < 2 ? '0' + value : value;
    }

    const handleDelete = () => {
        if (props.user?.clocks) {
            const index = props.user?.clocks?.findIndex((u) => u.date === props.clock.date);
            props.user?.clocks?.splice(index, index >= 0 ? 1 : 0);

            props.onSetUser(props.user);
        }
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    {moment(props.clock?.date)?.format('DD/MM/yyyy')}
                </Typography>
                <Typography variant="subtitle1" style={{ width: '100%' }}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <span>{moment(props.clock?.enterOne)?.format('HH:mm')}</span>
                        <span>{moment(props.clock?.leaveOne)?.format('HH:mm')}</span>
                        <span>{moment(props.clock?.enterTwo)?.format('HH:mm')}</span>
                        <span>{moment(props.clock?.leaveTwo)?.format('HH:mm')}</span>
                    </div>
                </Typography>
                <Typography variant="subtitle2" style={{ width: '100%' }}>
                    <br />
                    Horas trabalhadas: {calculateTime()}
                </Typography>
            </CardContent>
            <CardActions style={{ width: '100%', display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Tooltip title="Editar">
                    <IconButton color="success" onClick={() => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Deletar">
                    <IconButton color="error" onClick={handleDelete}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
            <ClockDialog
                open={open}
                onSetOpen={setOpen}
                onClickOpen={handleClickOpen}
                onClickClose={handleClose}
                user={props.user}
                onSetUser={props.onSetUser}
                clock={props.clock}
                disableDate={true}
            ></ClockDialog>
        </Card>
    )
}
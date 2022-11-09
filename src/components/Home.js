import React from 'react';
import NavBar from './NavBar';
import EmptyList from './EmptyList';
import Clocks from './Clocks';
import ClockDialog from './ClockDialog';
import Search from './Search';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';

const Home = (props) => {
    if (!props.user) {
        window.location.href = '/sign-in';
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="main" style={{ width: '100%', height: '100%', }}>
            <NavBar onLogout={props.onLogout} />

            {props.user?.clocks?.length === 0 ?
                '' :
                <div>
                    <Search
                        user={props.user}
                        onSetUser={props.onSetUser}
                    />

                    <br />
                    <br />
                </div>}

            {props.user?.clocks?.length === 0 ? <EmptyList></EmptyList> : <Clocks user={props.user} onSetUser={props.onSetUser}></Clocks>}

            <Fab color="primary" aria-label="add" onClick={handleClickOpen}
                style={{
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed',
                }}>
                <AddIcon />
            </Fab>

            <ClockDialog
                open={open}
                onSetOpen={setOpen}
                onClickOpen={handleClickOpen}
                onClickClose={handleClose}
                user={props.user}
                onSetUser={props.onSetUser}
            ></ClockDialog>
        </Container>
    )
}

export default Home;
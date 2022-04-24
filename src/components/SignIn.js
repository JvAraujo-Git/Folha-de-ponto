import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';

const theme = createTheme();

export default function SignIn(props) {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = data.get('user');
        const password = data.get('password');

        const findUser = props.users.find((u) => u.user === user && u.password === password);
        if (findUser) {
            localStorage.setItem('loggedUser', JSON.stringify(findUser));
            window.location.href = '/';
        } else {
            setOpen(true);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="user"
                            label="Usuário"
                            name="user"
                            autoComplete="user"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Não tem uma conta? Cadastre-se"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Usuário e/ou senha incorretos!</Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
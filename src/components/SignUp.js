import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import Alert from '@mui/material/Alert';

const theme = createTheme();

export default function SignUp(props) {
    const [open, setOpen] = React.useState(undefined);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(undefined);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = data.get('user');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');

        if (props.users.find((u) => u.user === user)) {
            setOpen('userAlreadyExists');
            return;
        }

        if (password !== confirmPassword) {
            setOpen('passwordDoesntMatch');
            return;
        }

        props.onSetUsers({ user, password, clocks: [] });

        setOpen('signUpSucessfully');

        setTimeout(() => {
            window.location.href = '/sign-in';
        }, 2000);
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
                        Cadastro
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="user"
                                    label="Usuário"
                                    name="user"
                                    autoComplete="user"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar Senha"
                                    type="password"
                                    id="confirmPassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Cadastrar
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Já tem uma conta? Entrar
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={open === 'userAlreadyExists'} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Usuário já existente!</Alert>
            </Snackbar>

            <Snackbar open={open === 'passwordDoesntMatch'} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>As senhas não coincidem!</Alert>
            </Snackbar>

            <Snackbar open={open === 'signUpSucessfully'} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Cadastrado com sucesso!</Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
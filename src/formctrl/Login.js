import {useState, useEffect, useRef} from "react";

import {
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    IconButton,
    Button,
    Input,
    Checkbox,
    Alert,
    Stack,
    Grid,
    Box,
    OutlinedInput,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

function Login() {
    const userRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    //Evitar perda de foco ao clicar no botão de mostrar senha
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(username, password);
    }

    return (
        <Grid container direction ="column">
            <Grid >
                <TextField
                required
                id="username"
                inputRef={userRef}
                placeholder="Usuário"
                fullWidth
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </Grid>
            
        <Grid sx={{mt: 2}}>
            <FormControl variant="outlined" fullWidth>
            <OutlinedInput
                size="small"
                id="password"
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    style={{ marginRight: '-0.5em' }}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                />
            </FormControl>
        </Grid>
        <Grid sx={{mt: 2}}>
            <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
            >
                Entrar
            </Button>
        </Grid>
        </Grid>
    )
}

export default Login

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
    Typography,
    OutlinedInput,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useState, useEffect, useRef } from "react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


function Signup() {
    const userRef = useRef();
    const errRef = useRef();

    //Inputs
    const [username, setUsername] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [password, setPassword] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showMatch, setShowMatch] = useState(false);

    //Focar nome de usuário ao iniciar componente
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //Checar se username é válido em "tempo real"
    useEffect(()=> {
        setValidName(USER_REGEX.test(username));
    }, [username])

    //Checar se email é válido
    useEffect(()=> {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    //Checar se senha é válida e
    //Checar se as senhas são enguais
    useEffect(()=> {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    // Handles Display and Hide Password
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowMatch = () => setShowMatch((show) => !show);
    //Evitar perda de foco ao clicar no botão de mostrar senha
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownMatch = (event) => {
        event.preventDefault();
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        //tentativa de ativar botão por js (hack)
        const v1 = USER_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);
        if (!v1 || !v2 || !v3) {
            console.log("Invalid Entry");
            return;
        }

        console.log(username,email, password);

    }


    return (
        <Grid container direction="column"  >

        <Grid sx={{mt: 2}}>
            <TextField
            required
            error={!!username && !validName}
            id="username"
            inputRef={userRef}
            value={username}
            autoComplete="off"
            placeholder="Usuário"
            fullWidth
            size="small"
            onChange={(e)=> setUsername(e.target.value)}
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}                                                                              
            />
            <Grid container alignItems="center" sx={{ mt: 1, display: !!username && !validName ? 'block' : 'none' }}>
            
            <Typography 
                id="uidnote" 
                variant="body2" 
                color="error" 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffe6e6', // Fundo vermelho claro
                    border: '1px solid red', // Borda vermelha
                    borderRadius: '4px', // Borda arredondada
                    padding: '8px', // Espaçamento interno
                    textAlign: 'left' // Alinhamento do texto à esquerda
                }}
            >
                <ErrorOutlineIcon style={{ marginRight: '0.5em' }} color="error" /> 4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </Typography>
            </Grid>
        </Grid>

        <Grid sx={{mt: 2}}>
            <TextField
            required
            error={!!email && !validEmail}
            id="email"
            value={email}
            autoComplete="off"
            placeholder="E-mail"
            fullWidth
            size="small"
            onChange={(e)=> setEmail(e.target.value)}
            aria-invalid={validEmail? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}                                                                              
            />
            <Grid sx={{ mt: 1, display: (email && !validEmail) ? 'block' : 'none' }}>
                <Typography 
                    id="emailnote" 
                    variant="body2" 
                    color="error" 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#ffe6e6', // Fundo vermelho claro
                        border: '1px solid red', // Borda vermelha
                        borderRadius: '4px', // Borda arredondada
                        padding: '8px', // Espaçamento interno
                        textAlign: 'left' // Alinhamento do texto à esquerda
                    }}
                >
                <ErrorOutlineIcon style={{ marginRight: '0.5em' }}  color="error" /> E-mail inválido
                </Typography>
            </Grid>
        </Grid>

        <Grid sx={{mt: 2}}>
            <FormControl variant="outlined" fullWidth>
            <OutlinedInput
                size="small"
                id="password"
                error={!!password && !validPwd}
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {setPassword(e.target.value);}}
                value={password}
                onFocus={()=>setPwdFocus(true)}
                onBlur={()=>setPwdFocus(false)}
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
            <Grid sx={{ mt: 1, display: (!!password && !validPwd) ? 'block' : 'none' }}>
            <Typography 
                    id="pwdnote" 
                    variant="body2" 
                    color="error" 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#ffe6e6', // Fundo vermelho claro
                        border: '1px solid red', // Borda vermelha
                        borderRadius: '4px', // Borda arredondada
                        padding: '8px', // Espaçamento interno
                        textAlign: 'left' // Alinhamento do texto à esquerda
                    }}
                >
                <ErrorOutlineIcon color="error" style={{ marginRight: '0.5em' }} /> 8 a 24 caracteres.<br />
                Incluir maiuscula, minuscula, numero e símbolo especial.<br />
            </Typography>
            </Grid>
        </Grid>

        <Grid sx={{mt: 2}}>
            <FormControl  variant="outlined" fullWidth>
            <OutlinedInput
                size="small"
                id="matchpwd"
                placeholder="Confirmar Senha"
                onChange={(e) => {setMatchPwd(e.target.value);}}
                value={matchPwd}
                onFocus={()=>setMatchFocus(true)}
                onBlur={()=>setMatchFocus(false)}
                error={!!matchPwd && !validMatch} //Error ativará apenas tenha algo no campo e seja inválido
                type={showMatch ? "text" : "password"}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowMatch}
                    onMouseDown={handleMouseDownMatch}
                    style={{ marginRight: '-0.5em' }}
                    >
                    {showMatch ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
            </FormControl>
            <Grid sx={{ mt: 1, display: (matchFocus && !validMatch) ? 'block' : 'none' }}>
                <Typography 
                id="matchpwd" 
                variant="body2" 
                color="error" 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffe6e6', // Fundo vermelho claro
                    border: '1px solid red', // Borda vermelha
                    borderRadius: '4px', // Borda arredondada
                    padding: '8px', // Espaçamento interno
                    textAlign: 'left' // Alinhamento do texto à esquerda
                }}
                >
                <ErrorOutlineIcon style={{ marginRight: '0.5em' }}  color="error" /> As senhas devem ser iguais.
                </Typography>
            </Grid>
        </Grid>

        <Grid sx={{mt: 2}}>
            <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            startIcon={<AppRegistrationIcon />}
            disabled={!validName || !validPwd || !validMatch ? true : false}
            >
                Cadastrar
            </Button>
        </Grid>
        </Grid>
    )
}

export default Signup

import { Avatar, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, Link, OutlinedInput, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Forgetpassword from '../forgetpassword/Forgetpassword';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';


const Login = ({ setUrl, setRequestOptions, setSingIn, data }) => {

  const [forgetPassword, setForgetPassword] = useState(false);
  const [inputEmail, setinputEmail] = useState('');
  const [inputPassword, setinputPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    setUrl("https://users-wallet-go.herokuapp.com/users/login");
    setRequestOptions({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inputEmail, password: inputPassword })
    })
  };  

  const emailValidation = (e) => {
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(e.target.value === ''){ 
      setErrorEmail('Este campo es obligatorio.')
    }
    else if (e.target.value.match(regEmail) || e.target.value === '') {
      setErrorEmail('')
    } else {
      setErrorEmail('El email es invalido.')
    }
  }

  const passwordValidation = (e) => {
    //Mínimo ocho caracteres, al menos una letra y un número.
    let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(e.target.value === ''){ 
      setErrorPassword('Este campo es obligatorio.')
    }
    else if (e.target.value.match(regPassword) || e.target.value === '') {
      setErrorPassword('')
    } else {
      setErrorPassword('La contraseña es invalida.')
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(showPassword === true ? false : true);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const paperStyle = { padding: 30, height: '65vh', width: '30vw', margin: "50px auto" }
  const avatarStyle = { backgroundColor: 'rgb(105, 105, 221)', padding: '8px' }
  const btnstyle = { margin: '8px 0' }
  const textFieldStyle = { margin: '5px', width: '22vw' }

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><FontAwesomeIcon icon={faLock} size='lg' /></Avatar>
          <h2>Iniciar sesion</h2>
        </Grid>
        <FormControl variant="outlined">
        <OutlinedInput
          style={textFieldStyle}
          variant="outlined"
          placeholder='Ingresar email'
          required
          margin="dense"
          error={errorEmail !== ''}
          id="standard-error-helper-text"
          value={inputEmail}
          helperText={errorEmail}
          onBlur={(e) => emailValidation(e)}
          onChange={(e) => { setinputEmail(e.target.value) }}
        />
        {errorEmail !== '' ? (
            <FormHelperText error id="accountId-error">
              {errorEmail}
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl variant="outlined">
          <OutlinedInput style={textFieldStyle}
            placeholder='Ingresar contraseña'
            type={showPassword ? 'text' : 'password'}
            required
            margin="dense"
            id="standard-error-helper-text"
            error={errorPassword !== ''}
            helperText={errorPassword}
            value={inputPassword}
            onBlur={(e) => passwordValidation(e)}
            onChange={(e) => setinputPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errorPassword !== '' ? (
            <FormHelperText error id="accountId-error">
              {errorPassword}
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
            />
          }
          label="Recordar credenciales"
        />
        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={formHandler}>Iniciar sesion</Button>
        <Typography >
          <Link component="button" variant="body2" onClick={() => { setForgetPassword(true) }}>
            Olvido su contraseña?
          </Link>
        </Typography>
        <Typography > Todavia no tiene cuenta?
          <Link component="button" variant="body2" onClick={() => { setSingIn(true) }}>
            Registrarse
          </Link>
        </Typography>
      </Paper>
      <Forgetpassword setForgetPassword={setForgetPassword} forgetPassword={forgetPassword} />
</div>
  );
};
export default Login;

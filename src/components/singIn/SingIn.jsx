import React, { useState, useEffect } from 'react';
import { decodeToken } from "react-jwt";
import './singIn.css';
import { Avatar, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, Link, OutlinedInput, Paper, Tooltip, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const SingIn = ({ setUrl, setRequestOptions, setSingIn, data }) => {

  const [validatedFields, setValidatedFields] = useState(false);
  const [inputName, setinputName] = useState('');
  const [inputLastName, setinputLastName] = useState('');
  const [inputDocument, setinputDocument] = useState('');
  const [inputEmail, setinputEmail] = useState('');
  const [inputBirthday, setinputBirthday] = useState('');
  const [inputPhone, setinputPhone] = useState('');
  const [inputPassword, setinputPassword] = useState('');
  const [inputConfirmPassword, setinputConfirmPassword] = useState('');
  const [errorNombre, setErrorName] = useState(false);
  const [errorLastNombre, setErrorLastName] = useState(false);
  const [errorDocument, setErrorDocument] = useState(false);
  const [errorBirthday, setErrorBirthday] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    if (validatedFields && inputName !== '' && inputLastName !== '' && inputDocument !== ''
      && inputBirthday !== '' && inputEmail !== '' && inputPhone !== '' && inputPassword !== '') {
      setUrl("https://users-wallet-go.herokuapp.com/users/register");
      setRequestOptions({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            name: inputName,
            lastname: inputLastName,
            document: parseInt(inputDocument),
            birthday: inputBirthday,
            email: inputEmail,
            phone: parseInt(inputPhone),
            password: inputPassword,
          })
      });
    }
    else {
      if (inputName === '') { setErrorName(true) }
      if (inputLastName === '') { setErrorLastName(true) }
      if (inputDocument === '') { setErrorDocument(true) }
      if (inputBirthday === '') { setErrorBirthday(true) }
      if (inputEmail === '') { setErrorEmail('Este campo es obligatorio.') }
      if (inputPhone === '') { setErrorPhone(true) }
      if (inputPassword === '') { setErrorPassword('Este campo es obligatorio.') }
      if (inputConfirmPassword === '') { setErrorPasswordConfirm('La contraseña es invalida.') }
    }
  };

  useEffect(() => {
    if (data?.token) {
      console.log('seee')
      const token = decodeToken(data?.token);
      setUrl("https://wallets-back-node.herokuapp.com/wallets");
      setRequestOptions({
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': data?.token },
        body: JSON.stringify(
          {
            idUser: token.user_id
          })
      });
    }
  }, [data]);

  const emailValidation = (e) => {
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (e.target.value === '') {
      setErrorEmail('Este campo es obligatorio.');
      setValidatedFields(false);
    }
    else if (e.target.value.match(regEmail) || e.target.value === '') {
      setErrorEmail('')
      setValidatedFields(true);
    } else {
      setErrorEmail('El email es invalido.');
      setValidatedFields(false);
    }
  }

  const passwordValidation = (e) => {
    //Mínimo ocho caracteres, al menos una letra y un número.
    let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (e.target.value === '') {
      setErrorPassword('Este campo es obligatorio.')
      setValidatedFields(false);
    }
    else if (e.target.value.match(regPassword) || e.target.value === '') {
      setErrorPassword('')
      setValidatedFields(true);
    } else {
      setErrorPassword('La contraseña es invalida.')
      setValidatedFields(false);
    }
  }

  const passwordConfirmValidation = (e) => {
    //Mínimo ocho caracteres, al menos una letra y un número.
    let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (e.target.value === '') {
      setErrorPasswordConfirm('Este campo es obligatorio.')
      setValidatedFields(false);
    }
    else if (e.target.value.match(regPassword) || e.target.value === '') {
      setErrorPasswordConfirm('')
      setValidatedFields(true);
    } else {
      setErrorPasswordConfirm('La contraseña es invalida.')
      setValidatedFields(false);
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(showPassword === true ? false : true);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const paperStyle = { padding: 30, height: '75vh', width: '40vw', margin: "40px auto" }
  const avatarStyle = { backgroundColor: 'rgb(105, 105, 221)', padding: '8px' }
  const btnstyle = { margin: '8px 0' }
  const textFieldStyle = { margin: '5px', width: '18vw' }
  const grid = { display: 'flex', directionFlex: 'row', alignItems: 'center', justifyContent: 'center' }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><FontAwesomeIcon icon={faUser} size='lg' /></Avatar>
          <h2>Registrarse</h2>
        </Grid>
        <Grid style={grid}>
          <FormControl variant="outlined">
            <OutlinedInput
              style={textFieldStyle}
              variant="outlined"
              placeholder='Ingresar Nombre'
              required
              margin="dense"
              type="text"
              id="standard-error-helper-text"
              error={errorNombre === true}
              value={inputName}
              onBlur={() => { setErrorName(inputName === '' ? true : false) }}
              onChange={(e) => { setinputName(e.target.value) }}
            />
            {errorNombre ? (
              <FormHelperText error id="accountId-error">
                Este campo es obligatorio.
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl variant="outlined">
            <OutlinedInput
              style={textFieldStyle}
              variant="outlined"
              placeholder='Ingresar Apellido'
              required
              margin="dense"
              type="text"
              id="standard-error-helper-text"
              error={errorLastNombre === true}
              value={inputLastName}
              onBlur={() => { setErrorLastName(inputLastName === '' ? true : false) }}
              onChange={(e) => { setinputLastName(e.target.value) }}
            />
            {errorLastNombre ? (
              <FormHelperText error id="accountId-error">
                Este campo es obligatorio.
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid style={grid}>
          <FormControl variant="outlined">
            <OutlinedInput
              style={textFieldStyle}
              variant="outlined"
              placeholder='Ingresar documento'
              required
              margin="dense"
              type='number'
              id="standard-error-helper-text"
              error={errorDocument === true}
              value={inputDocument}
              onBlur={() => { setErrorDocument(inputDocument === '' ? true : false) }}
              onChange={inputDocument.length < 11 ? (e) => { setinputDocument(e.target.value) } : null}
            />
            {errorDocument ? (
              <FormHelperText error id="accountId-error">
                Este campo es obligatorio.
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl variant="outlined">
            <OutlinedInput
              style={textFieldStyle}
              variant="outlined"
              required
              margin="dense"
              type='date'
              id="standard-error-helper-text"
              error={errorBirthday === true}
              value={inputBirthday}
              onBlur={() => { setErrorBirthday(inputBirthday === '' ? true : false) }}
              onChange={(e) => { setinputBirthday(e.target.value) }}
            />
            {errorBirthday ? (
              <FormHelperText error id="accountId-error">
                Este campo es obligatorio.
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid style={grid}>
          <FormControl variant="outlined">
            <OutlinedInput
              style={textFieldStyle}
              variant="outlined"
              placeholder='Ingresar email'
              required
              margin="dense"
              type='email'
              id="standard-error-helper-text"
              error={errorEmail !== ''}
              value={inputEmail}
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
            <OutlinedInput
              style={textFieldStyle}
              variant="outlined"
              placeholder='Ingresar Telefono'
              required
              margin="dense"
              type='number'
              id="standard-error-helper-text"
              error={errorPhone === true}
              value={inputPhone}
              onBlur={() => { setErrorPhone(inputPhone === '' ? true : false) }}
              onChange={inputPhone.length < 11 ? (e) => { setinputPhone(e.target.value) } : null}
            />
            {errorPhone ? (
              <FormHelperText error id="accountId-error">
                Este campo es obligatorio.
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid style={grid}>
          <Tooltip title="La contraseña debe ser de mas de 8 caracteres 
        y debe contener al menos 1 mayuscula y 1 numero" placement="left" arrow>
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
          </Tooltip>
          <FormControl variant="outlined">
            <OutlinedInput style={textFieldStyle}
              placeholder='Ingresar contraseña'
              type={showPassword ? 'text' : 'password'}
              required
              margin="dense"
              id="standard-error-helper-text"
              error={errorPasswordConfirm !== ''}
              helperText={errorPasswordConfirm}
              value={inputConfirmPassword}
              onBlur={(e) => passwordConfirmValidation(e)}
              onChange={(e) => setinputConfirmPassword(e.target.value)}
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
            {errorPasswordConfirm !== '' ? (
              <FormHelperText error id="accountId-error">
                {errorPasswordConfirm}
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        {data?.error ? (
          <Typography color="error">
            El registro no se a podido realizar.
          </Typography>
        ) : null}
        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={formHandler}>Registrarse</Button>

        <Typography > Ya tenes cuenta?&nbsp;&nbsp;
          <Link component="button" variant="body2" onClick={() => setSingIn(false)}>
            Inicia sesion
          </Link>
        </Typography>

      </Paper>
    </Grid>
  );
};
export default SingIn;

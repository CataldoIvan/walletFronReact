import React, { useState, useEffect } from 'react';
import './sendMoney.css';
import { Avatar, Divider, Grid, Paper, Select, TextField, Chip, MenuItem, Input, CircularProgress, Typography, OutlinedInput, InputAdornment, FormControl, InputLabel, Switch, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useFetch from '../../hooks/useFetch';


const SendMoney = ({ data }) => {
  const [defaultOption, setDefaultOption] = useState(true);
  const [isDolar, setIsDolar] = useState(false);
  const [inputAmount, setInputAmount] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [userAddressee, setUserAddressee] = useState('');
  const [urlUser, setUrlUser] = useState('');
  const [requestOptionsUser, setRequestOptionsUser] = useState('');
  const { loading: loadingUser, data: dataUser, error: errorUser } = useFetch(urlUser, requestOptionsUser);
  const [urlEmails, setUrlEmails] = useState('');
  const [requestOptionsEmails, setRequestOptionsEmails] = useState('');
  const { loading: loadingEmails, data: dataEmails, error: errorEmails } = useFetch(urlEmails, requestOptionsEmails);
  const [urlSend, setUrlSend] = useState('');
  const [requestOptionsSend, setRequestOptionsSend] = useState('');
  const { loading: loadingSend, data: dataSend, error: errorSend } = useFetch(urlSend, requestOptionsSend);

  const optionDefault = [{ title: 'Ingrese al menos 3 caracteres' }]

  useEffect(() => {
    if (searchEmail.length > 2) {
      setDefaultOption(false);
      setUrlEmails("https://users-wallet-go.herokuapp.com/users/allusers");
      setRequestOptionsEmails({
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
    }
    else {
      setDefaultOption(true);
    }
  }, [searchEmail]);

  const userHandler = (value) => {
    if (!defaultOption) {
      setUrlUser(`https://users-wallet-go.herokuapp.com/users/searchuser?email=${value}`);
      setRequestOptionsUser({
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
    }
  };
  const sendMoney = () => {
    if (!defaultOption) {
      setUrlSend('https://billetera-virtual-node-express.herokuapp.com/addOperation');
      setRequestOptionsSend({
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          origen_id: data.user[0].id,
          origen_nombre: data.user[0].name + " " + data?.user[0].lastname,
          destino_id: dataUser.users[0].id,
          destino_nombre: dataUser.users[0].name + " " + dataUser.users[0].lastname,
          tipo_transaccion: 1,
          monto: parseInt(inputAmount),
          estado: 1
        }),
      });
    }
  };

  return (
    <>
      <Grid item container xs={12} sm={8}>
        <Grid xs={12} sm={2}></Grid>
        <Grid xs={12} sm={10}>
          <Paper elevation={3} className="send">
            <Grid item container xs={12} sm={12} direction="row" className="headerSaldo" alignItems="center" justifyContent="center" alignContent="center">
              <Grid item xs={12} sm={3} align="center">
                <Avatar>{dataUser ? dataUser.users[0].name.substring(0, 1).toUpperCase() : null}</Avatar>
              </Grid>
              <Grid item xs={12} sm={9} align="left">
                <Autocomplete
                  id="asynchronous-demo"
                  noOptionsText={defaultOption ? 'Ingrese al menos 3 caracteres' : 'Email no encontrado'}
                  loading={loadingUser}
                  options={defaultOption ? optionDefault : dataEmails ? dataEmails.users : optionDefault}
                  getOptionLabel={defaultOption ? (optionDefault) => optionDefault.title : dataEmails ? (users) => users.email : (optionDefault) => optionDefault.title}
                  style={{ width: 350 }}
                  renderInput={(params) => (
                    <TextField {...params}
                      label="Email destinatario"
                      variant="outlined"
                      onChange={(e) => { setSearchEmail(e.target.value) }}
                      onBlur={(inputProps) => userHandler(inputProps.target.value)}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingUser ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid item container xs={12} sm={12}>
              <Grid item xs={12} sm={12} className={"row"}>
                <Typography variant="h4">{dataUser ? dataUser.users[0].name + " " + dataUser.users[0].lastname : ' '}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} className={"row"}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Monto</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    inputProps={{ style: { textAlign: 'center', fontSize: '20px', width: '10vw' } }}
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    startAdornment={<InputAdornment position="start">{isDolar ? 'US$' : '$'}</InputAdornment>}
                    labelWidth={50}
                  />
                </FormControl>
                <Grid item container xs={12} sm={12}>
                  <Grid item container xs={12} sm={12} className={"row"}>
                    <Grid item xs={12} sm={12} className={"row"}>
                      Dolar? <Switch
                        onChange={() => setIsDolar(isDolar ? false : true)}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={12} className={"row"}>
                      <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        className={"boton"}
                        onClick={() => sendMoney() }
                      >Enviar</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default SendMoney;
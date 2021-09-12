import React, { useState, useEffect } from 'react';
import './wallet.css';
import logoVisa from '../../VisaLogo.png';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons';

const Wallet = ({dataBalance}) => {

  return (
    <>
      <Grid item container xs={12} sm={4}>
        <Grid item container xs={12} sm={11}>
          <Grid item xs={12} sm={12} alignItems="center">
            <Paper elevation={3} className="saldo">
              <Grid item container xs={12} sm={12} direction="row" className="headerSaldo" alignItems="center" justifyContent="center" alignContent="center">
                <Grid item xs={12} sm={2} >
                  <FontAwesomeIcon icon={faMoneyBillWaveAlt} />
                </Grid>
                <Grid item xs={12} sm={10} >
                  <Typography variant="h6">Saldos Disponibles</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid item container direction="row" xs={12} sm={12} >
                <Grid item container xs={12} sm={6} className="cardContainer">
                  <Grid item xs={12} sm={12} >
                    <Typography>Saldo $</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography>${dataBalance?.balancePesos}</Typography>
                  </Grid>
                </Grid>
                <Grid item container xs={12} sm={6}>
                  <Grid item xs={12} sm={12}>
                    <Typography>Saldo US$</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography>US${dataBalance?.balanceDolares}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper elevation={3} className="dolar">
              <Grid item container xs={12} sm={12} direction="row" className="headerDolar" alignItems="center" justifyContent="center" alignContent="center">
                <Grid item xs={12} sm={2} >
                  <FontAwesomeIcon icon={faCreditCard} />
                </Grid>
                <Grid item xs={12} sm={10} >
                  <Typography variant="h6">Tarjetas</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid item container xs={12} sm={12} >
                <Grid item xs={12} sm={12} className="cardContainer">
                <Paper elevation={3} className="card">
                <Grid item xs={12} sm={2} >
                  <img src={logoVisa} className="logo"/>
                </Grid>
                <Typography >4519  6305  2596  5789</Typography>
                <Typography >TOMAS TADEO DEMARCO</Typography>
                <Typography >Vto 06/27  CVV 456</Typography>
                </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Wallet;
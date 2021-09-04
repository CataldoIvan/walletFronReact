import React, { useState, useEffect } from 'react';
import './main.css';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import ActivityMain from '../activityMain/ActivityMain';

import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons';
import Loading from '../loading/Loading';

const Main = ({setMenuOptions, dataUser}) => {

  const [url, setUrl] = useState('');
  const [requestOptions, setRequestOptions] = useState('');
  const { loading, data, error } = useFetch(url, requestOptions);

  useEffect(() => {
    setUrl("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
    setRequestOptions({
      method: 'GET'
    });
  }, []);

  return (
    <>
    {loading ? <Loading/> : null}
        <Grid item container xs={12} sm={4}>
          <Grid item container xs={12} sm={11}>
            <Grid item xs={12} sm={12} alignItems="center">
              <Paper elevation={3} className="saldo">
              <Grid item container xs={12} sm={12} direction="row" className="headerSaldo"alignItems="center" justifyContent="center" alignContent="center">
                <Grid item xs={12} sm={2} >
                <FontAwesomeIcon icon={faMoneyBillWaveAlt} />
                </Grid>
                <Grid item xs={12} sm={10} >
                  <Typography variant="h6">Saldo Disponible</Typography>
                </Grid>
                </Grid>
                  <Divider />
                  <Grid item container xs={12} sm={12}>
                    <Grid item xs={12} sm={12} >
                      <Typography>${dataUser?.user[0].balance}</Typography>
                    </Grid>
                  </Grid>

              </Paper>
              
            </Grid>
            <Grid item xs={12} sm={12}>
              {data ? <Paper elevation={3} className="dolar">
                <Grid item container xs={12} sm={12} direction="row" className="headerDolar"alignItems="center" justifyContent="center" alignContent="center">
                <Grid item xs={12} sm={2} >
                <FontAwesomeIcon icon={faExchangeAlt} />
                </Grid>
                <Grid item xs={12} sm={10} >
                  <Typography variant="h6">Cotizacion Dolar Oficial</Typography>
                </Grid>
                </Grid>
                  <Divider />
                <Grid item container direction="row" xs={12} sm={12} >
                  <Grid item container xs={12} sm={6}>
                    <Grid item xs={12} sm={12} >
                      <Typography>Compra</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography>${data[0].casa.compra}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} sm={6}>
                    <Grid item xs={12} sm={12}>
                      <Typography>Venta</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography>${data[0].casa.venta}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
                : null}
            </Grid>
          </Grid>
          <Grid item container xs={12} sm={1}></Grid>
        </Grid>
        <Grid item container xs={12} sm={6}>
          <Grid item xs={12} sm={11}>
            <ActivityMain setMenuOptions={setMenuOptions}></ActivityMain>
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
        </Grid>
    </>
  );
};
export default Main;
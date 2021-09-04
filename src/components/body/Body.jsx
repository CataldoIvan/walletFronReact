import React, { useState, useEffect } from 'react';
import './body.css';
import Main from '../main/Main';
import Activity from '../activity/Activity';
import Wallet from '../wallet/Wallet';
import SendMoney from '../sendMoney/SendMoney';
import AskForMoney from '../askForMoney/AskForMoney';
import Profile from '../profile/Profile';

import Menu from '../menu/Menu';
import { Grid } from '@material-ui/core';

const Body = ({ setTitle }) => {

  const [menuOptions, setMenuOptions] = useState(0);

  useEffect(() => {
    menuOptions === 0 ? setTitle('Inicio')
      : menuOptions === 1 ? setTitle('Billetera')
        : menuOptions === 2 ? setTitle('Actividades')
          : menuOptions === 3 ? setTitle('Enviar dinero')
            : menuOptions === 4 ? setTitle('Solicitar dinero')
            : setTitle('Perfil')
  }, [menuOptions]);

  return (
    <>
      <Grid container direction="row" className="body">
        <Grid item container xs={12} sm={2}>
          <Grid item xs={12} sm={11}>
            <Menu setMenuOptions={setMenuOptions} />
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
        </Grid>
        {menuOptions === 0 ? <Main setMenuOptions={setMenuOptions} />
          : menuOptions === 1 ? <Wallet />
            : menuOptions === 2 ? <Activity />
              : menuOptions === 3 ? <SendMoney />
                : menuOptions === 4 ? <AskForMoney />
                  : <Profile />}
      </Grid>
    </>
  );
};
export default Body;

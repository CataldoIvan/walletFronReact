import React, { useState, useEffect } from 'react';
import './body.css';
import useFetch from '../../hooks/useFetch';
import Main from '../main/Main';
import Activity from '../activity/Activity';
import Wallet from '../wallet/Wallet';
import SendMoney from '../sendMoney/SendMoney';
import AskForMoney from '../askForMoney/AskForMoney';
import Profile from '../profile/Profile';

import Menu from '../menu/Menu';
import { Grid } from '@material-ui/core';
import Header from '../header/Header';

const Body = ({  }) => {

  const [title, setTitle] = useState('Inicio');
  const [menuOptions, setMenuOptions] = useState(0);
  const [urlActivity, setUrlActivity] = useState('');
  const [requestOptionsActivity, setRequestOptionsActivity] = useState('');
  const { loading: loadingActivity, data: dataActivity, error: errorActivity } = useFetch(urlActivity, requestOptionsActivity);
  const [urlUser, setUrlUser] = useState('');
  const [requestOptionsUser, setRequestOptionsUser] = useState('');
  const { loading: loadingUser, data: dataUser, error: errorUser } = useFetch(urlUser, requestOptionsUser);
  const [urlBalance, setUrlBalance] = useState('');
  const [requestOptionsBalance, setRequestOptionsBalance] = useState('');
  const { loading: loadingBalance, data: dataBalance, error: errorBalance } = useFetch(urlBalance, requestOptionsBalance);

  useEffect(() => {
    setUrlUser("https://users-wallet-go.herokuapp.com/users/user");
    setRequestOptionsUser({
    method: 'GET',
     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setUrlBalance('https://users-wallet-go.herokuapp.com/users/balanceuser');
    setRequestOptionsBalance({
    method: 'GET',
     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
  }, []);

    useEffect(() => {
    if(dataUser){     
    var id = dataUser?.user[0].id;
    setUrlActivity(`https://billetera-virtual-node-express.herokuapp.com/home?id=${id}`);
        setRequestOptionsActivity({
            method: 'GET',
            headers: {'Authorization': localStorage.getItem('token')}
        });
      }
 }, [dataUser]);

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
    <Header title={title} dataActivity={dataActivity}/>
      <Grid container direction="row" className="body">
        <Grid item container xs={12} sm={2}>
          <Grid item xs={12} sm={11}>
            <Menu setMenuOptions={setMenuOptions} dataUser={dataUser}/>
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
        </Grid>
        {menuOptions === 0 ? <Main setMenuOptions={setMenuOptions} dataUser={dataUser} dataBalance={dataBalance}/>
          : menuOptions === 1 ? <Wallet />
            : menuOptions === 2 ? <Activity dataActivity={dataActivity} loadingActivity={loadingActivity} dataUser={dataUser}/>
              : menuOptions === 3 ? <SendMoney data={dataUser}/>
                : menuOptions === 4 ? <AskForMoney data={dataUser}/>
                  : <Profile dataUser={dataUser} loadingUser={loadingUser}/> }
      </Grid>
    </>
  );
};
export default Body;

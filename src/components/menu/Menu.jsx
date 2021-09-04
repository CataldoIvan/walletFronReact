import React from 'react';
import './menu.css';
import { Divider, Grid, List, ListItem, ListItemText, ListItemIcon, Drawer, Avatar, Typography } from '@material-ui/core';
import { faHome, faUser, faWallet, faArchive, faSignOutAlt, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconsPrimary = [faHome, faWallet, faArchive, faArrowAltCircleRight, faArrowAltCircleLeft];
const iconsSecundary = [faUser, faSignOutAlt];

const Menu = ({ setMenuOptions, dataUser }) => {

  const handleLogOut = () => {

    localStorage.setItem('token', 'null');
    window.location.reload();
  };

  return (
    <Grid >
      <Drawer
        variant="permanent"
        open>
        <Grid container className={"welcome"} direction="row" alignItems="center">
          <Grid item xs={12} sm={4} className={"avatar"}>
            <Avatar>{dataUser?.user[0].name.substring(0, 1).toUpperCase()
            }</Avatar>
          </Grid>
          <Grid item xs={12} sm={8} className={"name"}>
            <Typography variant="body2">Hola {dataUser?.user[0].name}!</Typography>
          </Grid>
        </Grid>
        <List>
          {['Inicio', 'Billetera', 'Actividad', 'Enviar dinero', 'Solicitar dinero'].map((text, index) => (
            <ListItem button key={text} onClick={() => setMenuOptions(index)}>
              <ListItemIcon><FontAwesomeIcon icon={iconsPrimary[index]} /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => setMenuOptions(5)}>
            <ListItemIcon><FontAwesomeIcon icon={iconsSecundary[0]} /></ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItem>
          <ListItem button onClick={(e) => handleLogOut()}>
            <ListItemIcon><FontAwesomeIcon icon={iconsSecundary[1]} /></ListItemIcon>
            <ListItemText primary={'Cerrar sesion'} />
          </ListItem>
        </List>
      </Drawer>
    </Grid>
  );
};
export default Menu;

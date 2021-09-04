import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit } from '@material-ui/icons';
import { Divider, Fade, Paper } from '@material-ui/core';


import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



const Profile = ({ dataUser }) => {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  return (
    <div className={classes.root}>


    <Paper>
      <Typography variant="h6" className={classes.title}>
        DATOS PERSONALES
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>
          <ListItem>
            <ListItemText primary="Nombre y Apellido" />
            <ListItemText primary={dataUser?.user[0].name + " " + dataUser?.user[0].lastname} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Email" />
            <ListItemText primary={dataUser?.user[0].email} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Documento" />
            <ListItemText primary={dataUser?.user[0].document} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemText primary="Fecha de nacimiento" />
            <ListItemText primary={dataUser?.user[0].birthday} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemText primary="Telefono" />
            <ListItemText primary={dataUser?.user[0].phone} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemText primary="Contraseña" />
            <ListItemText primary="****"/>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>



        </List>
      </div>

      </Paper>
    </div>
  );
}
export default Profile;
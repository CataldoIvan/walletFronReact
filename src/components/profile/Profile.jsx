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
import { Divider, Fade, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { faEdit, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../loading/Loading';
import dateFormat from 'dateformat';


const Profile = ({ dataUser, loading }) => {
  return (
    <Grid item container xs={12} sm={8}>
      {loading ? <Loading /> : null}
      <Grid xs={12} sm={2}></Grid>
      <Grid xs={12} sm={10}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon icon={faAddressCard} />
                  </IconButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;Datos personales
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: 150 }} align="left">
                  Nombre y Apellido
                </TableCell>
                <TableCell style={{ width: 80 }} align="left">
                  {dataUser?.user[0].name + " " + dataUser?.user[0].lastname}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 80 }} align="left">
                  Email
                </TableCell>
                <TableCell style={{ width: 80 }} align="left">
                  {dataUser?.user[0].email}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 80 }} align="left">
                  Documento
                </TableCell>
                <TableCell style={{ width: 80 }} align="left">
                  {dataUser?.user[0].document}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 80 }} align="left">
                  Fecha de nacimiento
                </TableCell>
                <TableCell style={{ width: 80 }} align="left">
                  {dateFormat(dataUser?.user[0].birthday, "dd/mm/yyyy")}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 80 }} align="left">
                  Telefono
                </TableCell>
                <TableCell style={{ width: 80 }} align="left">
                  {dataUser?.user[0].phone}
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 80 }} align="left">
                  Contraseña
                </TableCell>
                <TableCell style={{ width: 80 }} align="left">
                  **********
                </TableCell>
                <TableCell style={{ width: 80 }} align="right">
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
export default Profile;
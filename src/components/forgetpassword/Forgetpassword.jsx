import React, {useState} from 'react';
import './forgetpassword.css';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import Alert from '../alert/Alert';


const Forgetpassword = ({setForgetPassword, forgetPassword}) => {

  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = () => {
    setForgetPassword(false);
    setOpenAlert(true)
  };

  return (
    <div>
      <Dialog open={forgetPassword} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Recuperar contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese su email, y se le enviara un enlace a su correo para que pueda recuperar su contraseña. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} textAlert={"Enlace enviado."} severity={"success"}/>
    </div>
  );
};
export default Forgetpassword;

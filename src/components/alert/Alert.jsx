import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alerts = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Alert({ openAlert, setOpenAlert, textAlert, severity }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alerts onClose={handleClose} severity={severity}>
          {textAlert}
        </Alerts>
      </Snackbar>
    </div>
  );
}
// const [openAlert, setOpenAlert] = useState(false);
// severity="error" "warning" severity="info" severity="success"
// <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} textAlert={"Enlace enviado."} severity={"success"}/>


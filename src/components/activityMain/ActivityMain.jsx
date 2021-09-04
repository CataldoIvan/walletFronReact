import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './activityMain.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Avatar, Divider, TableHead } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';


const ActivityMain = ({setMenuOptions}) => {
    const [url, setUrl] = useState('');
    const [requestOptions, setRequestOptions] = useState('');
    const { loading, data, error } = useFetch(url, requestOptions);
    useEffect(() => {
        setUrl("https://billetera-virtual-node-express.herokuapp.com/home");
        setRequestOptions({
            method: 'GET'
        });
    }, []);
    return (
        <>
            <TableContainer component={Paper} elevation={3}>
                <Table aria-label="custom pagination table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Actividades recientes</TableCell>
                            <TableCell component="th" scope="row"></TableCell>
                            <TableCell component="th" scope="row"></TableCell>
                        </TableRow>
                        {data?.activitys.slice(0, 5).map((activitys) => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Avatar>{activitys.origen_nombre.substring(0, 1).toUpperCase()}</Avatar>
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    {activitys.tipo_transaccion === 1 ? "Enviaste dinero a " : "Recibiste dinero de "}{activitys.origen_nombre}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    ${activitys.monto}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell component="th" scope="row"></TableCell>
                            <TableCell component="th" scope="row" align="center" className="boton" onClick={() => setMenuOptions(2)}>
                                Ver todas las actividades
                            </TableCell>
                            <TableCell component="th" scope="row"></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
export default ActivityMain;



import React, { useEffect, useState } from 'react';
import './activityMain.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';

const ActivityMain = ({setMenuOptions, dataUser}) => {
    const [url, setUrl] = useState('');
    const [requestOptions, setRequestOptions] = useState('');
    const { loading, data, error } = useFetch(url, requestOptions);
    useEffect(() => {
        if(dataUser){
        var id = dataUser?.user[0].id;
        setUrl(`https://billetera-virtual-node-express.herokuapp.com/home?id=${id}`);
        setRequestOptions({
            method: 'GET',
            headers: {'Authorization': localStorage.getItem('token')}
        });}
    }, [dataUser]);
    return (
        <>
        {loading ? <Loading/> : null}
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
                                <TableCell component="th" scope="row" style={{ width: 150 }}>
                                    <Avatar>{
                                    activitys.origen_id === dataUser?.user[0].id ?
                                    activitys.destino_nombre.substring(0, 1).toUpperCase()
                                    : activitys.origen_nombre.substring(0, 1).toUpperCase()}
                                    </Avatar>
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    {activitys.origen_id === dataUser?.user[0].id ?
                                     "Enviaste dinero a " : "Recibiste dinero de "}
                                     {activitys.origen_id === dataUser?.user[0].id ?
                                    activitys.destino_nombre
                                    : activitys.origen_nombre}
                                </TableCell>
                                <TableCell style={{ width: 150 }} align="right">
                                    ${activitys.monto}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell component="th" scope="row"></TableCell>
                            <TableCell component="th" scope="row"  align="center" className="boton" onClick={() => setMenuOptions(2)}>
                            {data?.activitys[0] ? 'Ver todas las actividades' : 'Aun no tiene actividades para ver'}
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



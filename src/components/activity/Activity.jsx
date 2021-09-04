import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import useFetch from '../../hooks/useFetch';
import dateFormat from 'dateformat';
import { Avatar, Grid } from '@material-ui/core';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function CustomPaginationActionsTable() {

    let date = Date.now();
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [url, setUrl] = useState('');
    const [requestOptions, setRequestOptions] = useState('');
    const { loading, data, error } = useFetch(url, requestOptions);

    useEffect(() => {
        setUrl("https://billetera-virtual-node-express.herokuapp.com/home");
        setRequestOptions({
            method: 'GET'
        });
    }, []);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data?.activitys.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid item container xs={12} sm={8}>
        <Grid xs={12} sm={2}></Grid>
        <Grid xs={12} sm={10}>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableBody>
                    {data ?
                        (rowsPerPage > 0
                            ? data?.activitys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data?.activitys
                        ).map((activity) => (
                            <TableRow key={activity._id}>
                                <TableCell style={{ width: 160 }} align="right">
                                    <Avatar>{activity.origen_nombre.substring(0, 1).toUpperCase()}</Avatar>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {activity.tipo_transaccion === 1 ? "Enviaste dinero a "
                                        + activity.destino_nombre : "Recibiste dinero de " + activity.origen_nombre}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    ${activity.monto}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {dateFormat(date, "dd/mm/yyyy") === dateFormat(activity.updatedAt, "dd/mm/yyyy") ?
                                        dateFormat(activity.updatedAt, "hh:ss") : dateFormat(activity.updatedAt, "dd/mm/yyyy")}
                                </TableCell>
                            </TableRow>
                        )) : null}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={data?.activitys.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        </Grid>
        </Grid>
    );
}
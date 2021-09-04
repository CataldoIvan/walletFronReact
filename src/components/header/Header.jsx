import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Grid, Typography } from '@material-ui/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import './header.css';

const Header = ({title}) => {

  return (
    <>
      <header>
        <Grid container direction="row" alignItems="center" className="head">
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={3} >
            <Typography variant="h6" className={"title"}>{title}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} />
          <Grid item xs={12} sm={2}>
            <Badge badgeContent={1} color="secondary">
              <FontAwesomeIcon icon={faBell} color="white" size="10px" />
            </Badge>
          </Grid>
        </Grid>
      </header>
    </>
  );
};
export default Header;

import {useState,useCallback} from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserInfoBox from './UserInfoBox';
import TotalCommunityFilter from '../filters/TotalCommunityFilter';
import UserMenuItemBox from './UserMenuItemBox';

const DashboardNavbar = ({ onNavOpen}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <AppBar sx={{ boxShadow: '0 2px 4px rgb(0 0 0 / 50%)' }} elevation={0} >
      <Toolbar>
        <IconButton color="inherit" onClick={onNavOpen}>
          <MenuIcon sx={{ fontSize: '1.4em' }} />
        </IconButton>

        <Box sx={{ textAlign: 'center', flexGrow: 1, p: 1 }}>
          <TotalCommunityFilter />
        </Box>
        <Box>
          <UserInfoBox onClick={handleClick} />
          <UserMenuItemBox anchor={anchorEl} onClose={handleClose} open={open} />
        </Box>
      </Toolbar>

    </AppBar>
  );
};
DashboardNavbar.propTypes = {
  onNavOpen: PropTypes.func
};

export default DashboardNavbar;

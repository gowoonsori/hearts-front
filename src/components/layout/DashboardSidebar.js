import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import SidebarContetnt from './SidebarContent';

const DashboardSidebar = ({ onClose, open }) => {
  return (
    <>
      <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        variant="temporary"
        PaperProps={{
          sx: {
            backgroundColor : 'primary.main',
            width: 256
          }
        }}
      >
        <SidebarContetnt onClose={onClose}/>
      </Drawer>
    </>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default DashboardSidebar;

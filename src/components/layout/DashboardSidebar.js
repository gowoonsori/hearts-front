import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import SidebarContetnt from './SidebarContent';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';

const loginItems = [
  {
    href: '/logout',
    icon: LockOpenRoundedIcon,
    title: '로그아웃'
  },
 
];


const DashboardSidebar = ({ onClose, open }) => {
  const content = 
    (<SidebarContetnt items={loginItems} />);
  
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
        {content}
      </Drawer>
    </>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default DashboardSidebar;

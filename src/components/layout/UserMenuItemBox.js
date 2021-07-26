import { Box, List, Popover } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import NavItem from './NavItem';
import HomeIcon from '@material-ui/icons/Home';

const UserMenuItemBox = ({ anchor, onClose, open }) => {
  const items = [
    {
      href: '/',
      icon: HomeIcon,
      title: 'Home',
    },
    {
      href: '/profile',
      icon: PersonIcon,
      title: '프로필',
    },
    {
      href: '/likes',
      icon: FavoriteIcon,
      title: '좋아요',
    },
    {
      href: '/logout',
      icon: LockOpenIcon,
      title: '로그아웃',
    },
  ];

  return (
    <Popover
      anchorEl={anchor}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ border: '1px solid', borderColor: 'primary.contrastText', width: '252px', backgroundColor: 'primary.main', color: 'secondary.main' }}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
    </Popover>
  );
};

export default UserMenuItemBox;

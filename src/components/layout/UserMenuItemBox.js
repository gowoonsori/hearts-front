import { Box, List, Popover } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import NavItem from "./NavItem";

const UserMenuItemBox = ({ anchor, onClose, open }) => {
  const items=[
    {
      href: '/login',
      icon: LockIcon,
      title: '로그인'
    },
    {
      href: '/logout',
      icon: LockOpenIcon,
      title: '로그아웃'
    }
  ]

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
      <Box sx={{border:'1px solid', borderColor:'primary.contrastText', width: '252px', backgroundColor:'primary.main', color: 'secondary.main'}}>
        <List>
          {items.map((item) => (
          <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
    </Popover >
  )
};

export default UserMenuItemBox;
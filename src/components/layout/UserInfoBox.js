import { Avatar,Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const UserInfoBox = ({onClick}) => (
    <Box sx={{  
        color:'primary.contrastText', 
        p : 1,
        display: 'flex', 
        '&:hover': {
            cursor:'pointer'
        }
    }}
        onClick={onClick}
    >
        <Avatar alt="Cindy Baker" />
        <ExpandMoreIcon sx={{m: 'auto 0', ml:'4px', color:'#d7dadc'}}/>
    </Box>
);

export default UserInfoBox;

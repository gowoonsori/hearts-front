import { Box,Avatar,Typography} from '@material-ui/core';
import {  useRecoilValue } from 'recoil';
import {user} from '../atoms/user';
import Auth from '../hoc/auth';

const Profile = () => {
  const userInfo = useRecoilValue(user);
  return (
    <Box sx={{ background: '#030303', height: '400px', margin:'0 auto',mt:11,color: '#d7dadc', width: '300px', textAlign:'center' }}>
        <Avatar sx={{ margin:'0 auto',mb: 5, objectFit:'cover',width:'200px',height:'200px', '&:hover' : {cursor:'pointer'}}}/>
        
        <Typography sx={{my:2, fontWeight : 600}} variant="h1">{userInfo.name}</Typography>
        <Typography sx={{my:2}} variant="h4">{userInfo.email}</Typography>
    </Box>
  );
};

export default Auth(Profile);

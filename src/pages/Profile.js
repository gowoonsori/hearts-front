import { Container, Box} from '@material-ui/core';
import { useRecoilState } from 'recoil';
import {user} from '../atoms/user';
import Auth from '../hoc/auth';

const Profile = () => {
  const [userInfo,setUserInfo] = useRecoilState(user);
  return (
    <Container sx={{ background: '#030303', height: '100%', mt:4, color: '#d7dadc' }} maxWidth={false}>
        <Box>Profile</Box>
        <Box>id : {userInfo.id}</Box>
        <Box>name : {userInfo.name}</Box>
    </Container>
  );
};

export default Auth(Profile);

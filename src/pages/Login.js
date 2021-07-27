import { Box, Button, Container, Typography } from '@material-ui/core';
const Login = () => {
  
  return (
    <Container sx={{ background: '#030303', height: '100%', m: 'auto 0', color: '#d7dadc' }} maxWidth={false}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <img src="/images/saramin.png" alt="saramin" className="img"></img>
        <Box sx={{ p: 4, textAlign: 'center', height: '100%' }}>
          <Typography sx={{ minWidth: '300px', maxWidth: '800px', m: 10, mt: 36, textAlign: 'left', fontWeight: 900, fontSize: '3em' }} variant="h1">
            서비스를 이용하려면 로그인이 필요합니다.
          </Typography>
          <Button href="http://localhost:8000/login/saramin" sx={{ mr: 6, width: '60%', borderRadius: '15px', py:2, border: '1px solid #4776ee', color: '#4776ee', fontWeight: 'bold' }} >
          로그인</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

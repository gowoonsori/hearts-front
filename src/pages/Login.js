import { Box, Button, Container, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userSelector } from '../atoms/user';
import '../css/image.css';
import '../css/app.css';

const Login = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userSelector);
  useEffect(() => {
    if(userInfo?.response?.id) navigate('/');
  },[userInfo]);
  
  return (
    <Container sx={{ background: '#030303',  m: 'auto 0', width:'100%', color: '#d7dadc', height: '100%', overflow:'auto'}} maxWidth={false}>
      <Box sx={{ display: 'flex', height: '100%', overflow:'auto' }}>
        <Box className="img"></Box>
        <Box sx={{ p: 4, textAlign: 'center' ,ml:2,minWidth: '500px'}}>
          <Typography sx={{minWidth: '500px',  maxWidth: '800px', m: 2,mb:4, fontWeight: 900, fontSize: '3em' }} variant="h1">
            문구 공유 사이트
          </Typography>
          <Box sx={{pb: 5, pl: 10,minWidth: '500px',textAlign : 'left'}}>
            <Typography variant="h2">
              기능 명세
            </Typography>
            <ul>
              <li className="description-list">1. 사아로를 이용한 로그인, 로그인 유지와 로그아웃</li>
              <li className="description-list">2. 문구 공유 기능</li>
                <ul className="add-description-list">
                  <li>▫ 문구 등록 및 공유 기능</li>
                  <li>▫ 카테고리 관리 / 지정 기능</li>
                  <li>▫ 태크 / 키워드를 활용한 검색기능</li>
                  <li>▫ 좋아요 기능</li>
                  <li>▫ 검색 엔진 색인 차단 옵션</li>
                </ul>
              <li className="description-list">3. 마이 페이지</li>
                <ul className="add-description-list">
                  <li>▫ 내가 등록한 문구 공유/사용 현황</li>
                  <li>▫ 내가 좋아요 한 문구</li>
                </ul>
              <li className="description-list">4. RESTful API 제공</li>
                <ul className="add-description-list">
                  <li>▫ 검색기능 api 제공</li>
                  <li>▫ 샘플 클라이언트 작성 요망</li>
                </ul>
            </ul>
          </Box>
          <Button href="http://localhost/api/login/saramin" sx={{ width: '80%', borderRadius: '15px', py:2,ml:3, border: '2px solid #4776ee', color: '#4776ee',fontSize:"1.4em", fontWeight: 600 }} >
          로그인</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

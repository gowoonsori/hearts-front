import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import { user } from '../atoms/user';
import instance from '../atoms/axios';
import { alertState } from '../atoms/alert';

const LogOut = () => {
  const  setUserInfo = useSetRecoilState(user);
  const setOpenAlert = useSetRecoilState(alertState);
  const axios = useRecoilValue(instance);
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo({});
    axios.post('/user/logout').then((res)=>{
        if(res.data.success) navigate('/login', { replace: true });
        else navigate('/');
    })
    .catch(error => {
      if (error.response?.data) {
        setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
        if(error.response.data.response.status === 401 ){
          navigate('/login', { replace: true });
          return;
        }
        else if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
      }
      else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
    });
  }, [axios,setUserInfo,navigate,setOpenAlert]);
  return <></>;
};

export default LogOut;

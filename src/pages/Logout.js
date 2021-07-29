import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { user } from '../atoms/user';
import instance from '../atoms/axios';

const LogOut = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const axios = useRecoilValue(instance);
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo({});
    axios.post('/logout').then((res)=>{
        if(res.data.success)navigate('/login', { replace: true });
        else navigate('/');
    }).catch(e=> console.log(e));
  }, [axios,setUserInfo,navigate]);
  return <></>;
};

export default LogOut;

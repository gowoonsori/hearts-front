import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import likes from '../atoms/likes';
import { userSelector } from '../atoms/user';

const Auth = (SpecificComponent) => {
  const Authentication = (props) => {
    const [userInfo, setUserInfo] = useRecoilState(userSelector);
    const [likeList, setLikeList] = useRecoilState(likes);
    const navigate = useNavigate();

    useEffect(() => {
      const user = userInfo;
      if (typeof user === 'string' || !user?.id) {
        navigate('/login', { replace: true });
      } else {
        setUserInfo(user);
        if (user.likes) {
          const newLikes = user.likes.split(',');
          const convertNumber = newLikes.map(Number);
          setLikeList(convertNumber);
        }
      }
    }, [userInfo, setUserInfo, setLikeList,navigate]);

    return <SpecificComponent />;
  };
  return Authentication;
};
export default Auth;

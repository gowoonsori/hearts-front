import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import instance from '../atoms/axios';
import likes from '../atoms/likes';
import { userSelector } from '../atoms/user';
import { categoryList } from '../atoms/category';

const Auth = (SpecificComponent) => {
  const Authentication = (props) => {
    const axios = useRecoilValue(instance);
  const [categories, setCategories] = useRecoilState(categoryList);
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

      axios
      .get('/user/category')
      .then((res) => {
        if (res?.data.success) setCategories(res.data.response);
      })
      .catch((e) => console.log(e));
    }, [userInfo, setUserInfo, setLikeList,navigate]);

    return <SpecificComponent />;
  };
  return Authentication;
};
export default Auth;

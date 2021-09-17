import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import instance from '../atoms/axios';
import likes from '../atoms/likes';
import { userSelector } from '../atoms/user';
import { categoryList } from '../atoms/category';
import { alertState } from '../atoms/alert';

const Auth = (SpecificComponent) => {
  const Authentication = (props) => {
    const axios = useRecoilValue(instance);
    const [categories, setCategories] = useRecoilState(categoryList);
    const [getUserInfo, setUserInfo] = useRecoilState(userSelector);
    const [likeList, setLikeList] = useRecoilState(likes);
    const setOpenAlert = useSetRecoilState(alertState);
    const navigate = useNavigate();

    useEffect(() => {
      const response = getUserInfo;
      let user;

      if (response?.id) user = response;
      else if (response?.success) user = response.response;
      else {
        navigate('/login', { replace: true });
        return;
      }

      //유저 정보 set
      if (likeList.length === 1 && likeList[0] === -1 && user.likes !== null) {
        const newLikes = user.likes.split(',');
        const convertNumber = newLikes.map(Number);
        setLikeList(convertNumber);
      }
      setUserInfo(user);

      //카테고리 조회
      if (categories === null || categories === 'undefiend' ||
        categories === '' || categories.length === 0) {
        axios
          .get('/user/category')
          .then((res) => {
            if (res?.data.success) setCategories(res.data.response);
          })
          .catch((error) => {
            if (error.response) setOpenAlert({ state: true, message: error.response.data.response.message, severity: 'error' });
            else setOpenAlert({ state: true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
          });
      }
    }, []);
    return <SpecificComponent />;
  };
  return Authentication;
};
export default Auth;

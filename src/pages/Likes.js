import { Container } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import {  useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { posts} from '../atoms/post';
import PostList from '../components/lists/PostList';
import instance from '../atoms/axios';
import Auth from '../hoc/auth';
import { alertState } from '../atoms/alert';
import useScrollReset from '../hooks/useScrollReset';
import { user } from '../atoms/user';
import { useNavigate } from 'react-router-dom';

const Likes = () => {
  const axios = useRecoilValue(instance);
  const userInfo = useRecoilValue(user);
  const  setOpenAlert = useSetRecoilState(alertState);
  const [postList,setPostList] = useRecoilState(posts);
  const [hasMore,setHasMore] = useState(true);
  const scrollToTop = useScrollReset;
  const navigate = useNavigate();
  
  const fetchMoreData = useCallback(() => {
    const lastId = postList[postList.length-1]?.id ?? 0;
    axios
      .get(`/user/post/like?lastId=${lastId}`)
      .then((res) => {
        if (res?.data.success){
          if(res.data.response.length === 0) setHasMore(false);
          const newList = postList.slice(0,postList.length);
          newList.push(...res.data.response);
          setPostList(newList);
        } 
      })
      .catch(error => {
        if (error.response) {
          setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
          if(error.response.data.response.status === 401 ){
            navigate('/login', { replace: true });
            return;
          }
          else if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
        }
        else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
      });
  },[axios,postList,setPostList,setOpenAlert,setHasMore]);

  useEffect(()=>{
    setPostList([]);
    if(!userInfo?.id) return;
    scrollToTop();
    axios
      .get(`/user/post/like?lastId=0`)
      .then((res) => {
        if (res?.data.success){
          if(res.data.response.length === 0) setHasMore(false);
          setPostList(res.data.response);
        } 
      })
      .catch(error => {
        if (error.response){
          setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
          if(error.response.data.response.status === 401 ){
            navigate('/login', { replace: true });
            return;
          }
          else if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
        }
        else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
      });
  },[userInfo]);

  return (
    <Container sx={{ mt: 3 ,mb:10}} id="scrollableContainer"  maxWidth="md">
      <PostList posts={postList} fetchMoreData={fetchMoreData} hasMore={hasMore} />
    </Container>
  );
};

export default Auth(Likes);

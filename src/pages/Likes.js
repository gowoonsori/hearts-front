import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import {  useRecoilState, useRecoilValue } from 'recoil';
import {likePosts} from '../atoms/post';
import PostList from '../components/lists/PostList';
import instance from '../atoms/axios';
import Auth from '../hoc/auth';

const Likes = () => {
  const axios = useRecoilValue(instance);
  const [postList,setPostList] = useRecoilState(likePosts);

  useEffect(() => {
    axios
      .get('/user/post/like')
      .then((res) => {
        if (res?.data.success) setPostList(res.data.response);
      })
      .catch((e) => console.log(e));
  }, [axios, setPostList]);

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <PostList posts={postList} />
    </Container>
  );
};

export default Auth(Likes);

import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import posts from '../atoms/post';
import PostList from '../components/lists/PostList';
import instance from '../atoms/axios';

const Likes = () => {
  const axios = useRecoilValue(instance);
  const [postList, setPostList] = useRecoilState(posts);

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

export default Likes;

import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import posts from '../atoms/post';
import PostList from '../components/lists/PostList';
import instance from '../atoms/axios';

const Likes = () => {
  const axios = useRecoilValue(instance);
  const [postList,setPostList] = useRecoilState(posts);

  useEffect(async()=>{
    const postRes = await axios.get('/user/post/like').catch((e)=> console.log(e));
    if(postRes?.data.success){
      setPostList(postRes.data.response);
    }
  },[axios,setPostList]);

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <PostList posts={postList} />
    </Container>
  );
};

export default Likes;

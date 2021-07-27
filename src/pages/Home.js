import { Container } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import CreatePostBox from '../components/boxes/CreatePostBox';
import posts from '../atoms/post';
import PostList from '../components/lists/PostList';
import instance from '../atoms/axios';
import { useEffect } from 'react';
import { categoryList } from '../atoms/category';
import user from '../atoms/user';
import likes from '../atoms/likes';

const Home = () => {
  const [postList,setPostList] = useRecoilState(posts);
  const [categories,setCategories] = useRecoilState(categoryList);
  const [userInfo,setUserInfo] = useRecoilState(user);
  const [likeList,setLikeList] = useRecoilState(likes);
  const axios = useRecoilValue(instance);

  useEffect(async() => {
    const userRes = await axios.get('/user').catch((e)=> console.log(e));
    if(userRes?.data.success){
      setUserInfo(userRes.data.response);
      if(userRes.data.response.likes){
        const newLikes= userRes.data.response.likes?.split(',');
        setLikeList(newLikes);
      }
    }

    const postRes = await axios.get('/user/post/all').catch((e)=> console.log(e));
    if(postRes?.data.success){
      setPostList(postRes.data.response);
    }

    const categoryRes = await axios.get('/user/category').catch((e)=> console.log(e));
    if(categoryRes?.data.success){
      setCategories(categoryRes.data.response);
    }
  },[]);

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <CreatePostBox />
      <PostList posts={postList} />
    </Container>
  );
};

export default Home;

import { Container } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import CreatePostBox from '../components/boxes/CreatePostBox';
import posts from '../atoms/post';
import PostList from '../components/lists/PostList';
import instance from '../atoms/axios';
import { useEffect } from 'react';
import { categoryList } from '../atoms/category';
import Auth from '../hoc/auth';

const Home = () => {
  const [postList, setPostList] = useRecoilState(posts);
  const [categories, setCategories] = useRecoilState(categoryList);
  const axios = useRecoilValue(instance);

  useEffect(() => {
    axios
      .get('/user/post/all')
      .then((res) => {
        if (res?.data.success) setPostList(res.data.response);
      })
      .catch((e) => console.log(e));

    axios
      .get('/user/category')
      .then((res) => {
        if (res?.data.success) setCategories(res.data.response);
      })
      .catch((e) => console.log(e));
  }, [axios, setCategories,  setPostList ]);

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <CreatePostBox />
      <PostList posts={postList} />
    </Container>
  );
};

export default Auth(Home);

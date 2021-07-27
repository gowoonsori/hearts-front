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
  const [postList, setPostList] = useRecoilState(posts);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [likeList, setLikeList] = useRecoilState(likes);
  const axios = useRecoilValue(instance);

  useEffect(() => {
    axios
      .get('/user')
      .then((res) => {
        if (res?.data.success) {
          setUserInfo(res.data.response);
          if (res.data.response.likes) {
            const newLikes = res.data.response.likes?.split(',');
            setLikeList(newLikes);
          }
        }
      })
      .catch((e) => console.log(e));

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
  }, [axios, setCategories, setLikeList, setPostList, setUserInfo]);

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <CreatePostBox />
      <PostList posts={postList} />
    </Container>
  );
};

export default Home;

import { Container } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import CreatePostBox from '../components/boxes/CreatePostBox';
import posts from '../atoms/post';
import PostList from '../components/lists/PostList';

const Home = () => {
  const postList = useRecoilValue(posts);

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <CreatePostBox />
      <PostList posts={postList} />
    </Container>
  );
};

export default Home;

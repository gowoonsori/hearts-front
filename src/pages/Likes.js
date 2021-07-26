import { Container } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import posts from '../atoms/post';
import PostList from '../components/lists/PostList';

const Likes = () => {
  const postList = useRecoilValue(posts);

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <PostList posts={postList} />
    </Container>
  );
};

export default Likes;

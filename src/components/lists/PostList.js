import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import PostBox from '../boxes/PostBox';

const PostList = ({ posts }) => {
  return (
    <Box sx={{ p: 0, m: 1 }}>
      {posts?.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </Box>
  );
};

PostList.propTypes = {
  posts: PropTypes.array,
};

export default PostList;

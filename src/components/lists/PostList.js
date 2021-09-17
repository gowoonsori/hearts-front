import { Box,CircularProgress,Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import PostBox from '../boxes/PostBox';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostList = ({ posts,fetchMoreData, hasMore }) => {
  return (
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Box sx={{textAlign:'center',mt: 2,mb:6}}><CircularProgress sx={{color:'#d7d7d7'}} /></Box>}
        endMessage={<Box sx={{p: 6,height: '150px',textAlign:'center'}}><Typography sx={{color:'#d7d7d7'}} variant="h4"></Typography></Box>}
        style={{overflow:'hidden'}}
        scrollableTarget="dashboard-layout-content"
        >
          {posts?.length > 0 ?
            posts.map((post) => (
                <PostBox key={post.id} post={post} />
            ))
            :
            <Box sx={{p: 6,height: '120px',textAlign:'center'}}>
              <Typography sx={{color:'#d7d7d7'}} variant="h3">비었습니다.</Typography>
            </Box>
          }
      </InfiniteScroll>
    );
};

PostList.propTypes = {
  posts: PropTypes.array,
  dataFetch : PropTypes.func,
  hasMore : PropTypes.bool,
};

export default PostList;

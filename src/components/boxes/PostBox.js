import { Box, Container, Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import user from '../../atoms/user';
import TagList from '../lists/TagList';
import MoreButton from '../buttons/MoreButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PostUtilBox from './PostUtilBox';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import likes from '../../atoms/likes';
import CopyBox from './CopyBox';

const PostBox = ({ post }) => {
  const userInfo = useRecoilValue(user);
  const likeList = useRecoilValue(likes);

  const liked = likeList.find((v) => v.post_id === post.id);
  return (
    <Container id={post.id} sx={{ borderRadius: '5px', display: 'block', mx: 0, my: 1, py: 2, px: 4, backgroundColor: 'primary.main', color: 'secondary.main' }}>
      <Box sx={{ display: 'inline' }}>
        <Typography variant="h2">{post.content}</Typography>
      </Box>
      <TagList tags={post.tags} />
      <Box sx={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between' }}>
        {liked ? <PostUtilBox Icon={FavoriteIcon} text={post.total_like} /> : <PostUtilBox Icon={FavoriteBorderIcon} text={post.total_like} />}
        <PostUtilBox Icon={ShareIcon} text={post.share_cnt} />
        <CopyBox Icon={FileCopyIcon} content={post.content} />
        {post.user_id === userInfo.id && <MoreButton />}
      </Box>
    </Container>
  );
};

export default PostBox;

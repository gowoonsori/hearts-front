import { Avatar, Box, Container, Typography } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import {user} from '../../atoms/user';
import TagList from '../lists/TagList';
import MoreButton from '../buttons/MoreButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PostUtilBox from './PostUtilBox';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import likes from '../../atoms/likes';
import CopyBox from './CopyBox';
import instance from '../../atoms/axios';
import { useCallback } from 'react';
import posts from '../../atoms/post';

const PostBox = ({ post }) => {
  const userInfo = useRecoilValue(user);
  const [likeList, setLikeList] = useRecoilState(likes);
  const [postList, setPostList] = useRecoilState(posts);
  const axios = useRecoilValue(instance);
  
  const likeEvent = useCallback(async () => {
    const res = await axios.patch(`/user/post/${post.id}/like`).catch((e) => console.log(2));
    if (res?.data.success) {
      //좋아요 atom 업데이트
      const newLikeList = likeList.slice(0, likeList.length);
      newLikeList.push(post.id);
      setLikeList(newLikeList);
      
      //기존의 postList atom 내용 업데이트
      const newPostList = postList.slice(0, postList.length);
      const index = newPostList.findIndex((e) => e.id == post.id);
      newPostList.splice(index, 1, res.data.response);
      setPostList(newPostList);
    }
  }, [likeList, setLikeList, postList, setPostList]);
  
  const deleteLikeEvent = useCallback(async () => {
    const res = await axios.delete(`/user/post/${post.id}/like`).catch((e) => console.log(2));
    if (res?.data.success) {
      //좋아요 atom 업데이트
      const newLikeList = likeList.filter((like) => like != post.id);
      setLikeList(newLikeList);
      
      //기존의 postList atom 내용 업데이트
      const newPostList = postList.slice(0, postList.length);
      const index = newPostList.findIndex((e) => e.id == post.id);
      newPostList.splice(index, 1, res.data.response);
      setPostList(newPostList);
    }
  }, [likeList, post, setLikeList, postList, setPostList]);
  
  const liked = useCallback(()=> {
    return likeList.find((v) => v == post.id)
  },[likeList]);
  return (
    <Container id={post.id} sx={{ borderRadius: '5px', display: 'block', mx: 0, my: 1, py: 2, px: 4, backgroundColor: 'primary.main', color: 'secondary.main' }}>
      <Box sx={{ display: 'flex', mb:5 }}>
        <Avatar/>
        <Typography sx={{margin:'auto 0',mx:2}} variant="h3">{post.owner}</Typography>
        <Typography variant="h6" sx={{margin:'auto 0',color:"primary.contrastText"}}>{post.category}</Typography>
      </Box>
      <Box sx={{ display: 'inline' }}>
        <Typography variant="h2">{post.content}</Typography>
      </Box>
      <TagList tags={JSON.parse(post.tags)} />
      <Box sx={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between', mt:2 }}>
        {liked() ? <PostUtilBox Icon={FavoriteIcon} text={post.total_like} onClick={deleteLikeEvent} /> : <PostUtilBox Icon={FavoriteBorderIcon} text={post.total_like} onClick={likeEvent} />}
        <PostUtilBox Icon={ShareIcon} text={post.share_cnt} />
        <CopyBox id={post.id} Icon={FileCopyIcon} content={post.content} />
        {post.user_id === userInfo.id && <MoreButton id={post.id} />}
      </Box>
    </Container>
  );
};

export default PostBox;

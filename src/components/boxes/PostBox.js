import { Avatar, Box, Container, Typography } from '@material-ui/core';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { user } from '../../atoms/user';
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
import { useCallback, useState } from 'react';
import { posts} from '../../atoms/post';
import { alertState } from '../../atoms/alert';
import { useNavigate } from 'react-router-dom';

const PostBox = ({ post }) => {
  const [likeList, setLikeList] = useRecoilState(likes);
  const userInfo = useRecoilValue(user);
  const [postList, setPostList] = useRecoilState(posts);
  const axios = useRecoilValue(instance);
  const [liked,setLiked] = useState(likeList.includes(post.id));
  const setOpenAlert = useSetRecoilState(alertState);
  const navigate = useNavigate();
  const [likeCount,setLikeCount] = useState(post.total_like);
  const [shareCount,setShareCount] = useState(post.share_cnt);
  
  const likeEvent = useCallback(() => {
    setLikeCount(likeCount+1);
    setLiked(true);
    axios.post(`/user/post/${post.id}/like`)
    .then(res =>{
      if (res?.data.success) {
        //좋아요 atom 업데이트
        const newLikeList = likeList.slice(0, likeList.length);
        newLikeList.unshift(post.id);
        setLikeList(newLikeList);
      }
    })
    .catch(error => {
      setLikeCount(likeCount-1);
      setLiked(false);
      if (error.response) {
        setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
        if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
      }
      else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
    });
    
  }, [axios,post,likeList, setLikeCount,likeCount,setLikeList,navigate, postList, setPostList,setOpenAlert]);
  
  const deleteLikeEvent = useCallback(async () => {
    setLikeCount(likeCount-1);
    setLiked(false);
    axios.delete(`/user/post/${post.id}/like`)
    .then(res => {
      if (res?.data.success) {
        //좋아요 atom 업데이트
        const newLikeList = likeList.filter((like) => like !== post.id);
         setLikeList(newLikeList);
      }
    }).catch(error => {
      setLikeCount(likeCount+1);
      setLiked(true);
      if (error.response) {
        setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
        if(error.response.data.response.status === 401 ){
          navigate('/login', { replace: true });
          return;
        }
        else if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
      }
      else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
    });
  }, [axios,likeList, post,setLikeCount,likeCount, setLikeList,navigate, postList, setPostList,setOpenAlert]);

  const onClickCategoryEvent = useCallback(()=>{
    navigate(`/search/category?keyword=${post.category}&exact=true`);
  },[navigate,post.category]);

  const increaseShareCount = useCallback(()=>{
    setShareCount(shareCount+1);
  },[shareCount,setShareCount]);
  
  return (
    <Container id={post.id} sx={{ borderRadius: '5px', display: 'block', mx: 0, my: 1, py: 2, px: 4, backgroundColor: 'primary.main', color: 'secondary.main' }}>
      <Box sx={{ display: 'flex', mb: 5 }}>
        <Avatar />
        <Typography sx={{ margin: 'auto 0', mx: 2 }} variant="h3">
          {post.owner}
        </Typography>
        <Typography variant="h6" sx={{ margin: 'auto 0', color: 'primary.contrastText', '&:hover':{cursor:'pointer'} }} onClick={onClickCategoryEvent}>
          {post.category}
        </Typography>
      </Box>
      <Box sx={{ display: 'inline' }}>
        <Typography variant="h2">{post.content}</Typography>
      </Box>
      <TagList tags={post.tags} />
      <Box sx={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between', mt: 2 }}>
        {liked ? <PostUtilBox Icon={FavoriteIcon} text={likeCount} onClick={deleteLikeEvent} /> : <PostUtilBox Icon={FavoriteBorderIcon} text={likeCount} onClick={likeEvent} />}
        <PostUtilBox Icon={ShareIcon} text={shareCount} />
        <CopyBox id={post.id} Icon={FileCopyIcon} content={post.content} onClick={increaseShareCount} />
        {post.user_id === userInfo.id && <MoreButton id={post.id} />}
      </Box>
    </Container>
  );
};

export default PostBox;

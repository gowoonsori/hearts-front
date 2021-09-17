import { Box, Button, Popover } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useState, useCallback } from 'react';
import instance from '../../atoms/axios';
import {posts, selectPost} from '../../atoms/post';
import { useNavigate } from 'react-router-dom';
import likes from '../../atoms/likes';
import { alertState, dialogState } from '../../atoms/alert';

const MoreButton = ({ id }) => {
  const axios = useRecoilValue(instance);
  const [postList, setPostList] = useRecoilState(posts);
  const [likeList, setLikeList] = useRecoilState(likes);
  const  setSelectId = useSetRecoilState(selectPost);
  const setOpenDialog = useSetRecoilState(dialogState);
  const  setOpenAlert = useSetRecoilState(alertState);
  const navigate = useNavigate();

  const deletePost = useCallback(() => {
    axios
      .delete(`/user/post/${id}`)
      .then((res) => {
        if (res?.data.success) {
          const newList = postList.filter((post) => post.id !== id);
          setPostList(newList);
          const newLikeList = likeList.filter((like) => like !== id);
          setLikeList(newLikeList);
        }
      })
      .catch(error => {
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
      setOpenDialog(false)
  }, [id,axios, postList, setPostList,navigate,likeList,setLikeList,setOpenDialog]);

  const deletePostEvent = useCallback(()=>{
    setOpenDialog({
      state: true,
      message: '정말로 삭제하시겠습니까? 삭제후 데이터는 복구되지 않습니다.',
      event : deletePost,
    });
  },[setOpenDialog, deletePost]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const updateClick = useCallback(async() => {
    await setSelectId(id);
    navigate('/edit');
  }, [id,setSelectId,navigate]);

  const open = Boolean(anchorEl);

  return (
    <Box>
      <MoreHorizIcon sx={{ '&:hover': { cursor: 'pointer' } }} onClick={handleClick} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Button color="secondary" onClick={updateClick}>
          수정하기
        </Button>
        <Button color="secondary" onClick={deletePostEvent}>
          삭제하기
        </Button>
      </Popover>
    </Box>
  );
};

export default MoreButton;

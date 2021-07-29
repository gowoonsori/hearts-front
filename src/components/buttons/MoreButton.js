import { Box, Button, Popover } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useCallback } from 'react';
import instance from '../../atoms/axios';
import {posts, selectPost} from '../../atoms/post';
import { useNavigate } from 'react-router-dom';

const MoreButton = ({ id }) => {
  const axios = useRecoilValue(instance);
  const [postList, setPostList] = useRecoilState(posts);
  const [selectId, setSelectId] = useRecoilState(selectPost);
  const navigate = useNavigate();

  const deletePost = useCallback(() => {
    axios
      .delete(`/user/post/${id}`)
      .then((res) => {
        if (res?.data.success) {
          const newLikeList = postList.filter((post) => post.id !== id);
          setPostList(newLikeList);
        }
      })
      .catch((e) => console.log(e));
  }, [id,axios, postList, setPostList]);

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
        <Button color="secondary" onClick={deletePost}>
          삭제하기
        </Button>
      </Popover>
    </Box>
  );
};

export default MoreButton;

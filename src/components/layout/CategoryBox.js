import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useCallback } from 'react';
import instance from '../../atoms/axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import posts from '../../atoms/post';

const CreateBox = ({ category,onClose }) => {
  const axios = useRecoilValue(instance);
  const [postList,setPostList] = useRecoilState(posts);
  const onClickEvent = useCallback(async()=>{
    const res = await axios.get(`/user/post/category/${category.id}`).catch((e)=>console.log(e)) ;
    if(res?.data?.success){
      setPostList(res.data.response);
    }
    onClose();
  },[axios,setPostList,category,onClose]);

  return(
  <Box sx={{ display: 'flex', m: 1, '&:hover':{cursor:'pointer'} }} id={category.id} onClick={onClickEvent}>
    <Typography color="secondary.main" sx={{ m: 'auto 0' }}>
      {category.title}
    </Typography>
  </Box>
)};

CreateBox.propTypes = {
  category: PropTypes.object,
  onClose : PropTypes.func.isRequired,
};

export default CreateBox;

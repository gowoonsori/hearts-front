import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useCallback, useState } from 'react';
import instance from '../../atoms/axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import posts from '../../atoms/post';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { categoryList } from '../../atoms/category';

const CreateBox = ({ category,onClose }) => {
  const axios = useRecoilValue(instance);
  const [postList,setPostList] = useRecoilState(posts);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [openEdit, setOpenEdit] = useState(false);

  const getPostsEvent = useCallback(async()=>{
    const res = await axios.get(`/user/post/category/${category.id}`).catch((e)=>console.log(e)) ;
    if(res?.data?.success){
      setPostList(res.data.response);
    }
    onClose();
  },[axios,setPostList,category,onClose]);

  const deleteCategoryEvent = useCallback(()=>{
    axios.delete(`/user/category/${category.id}`)
    .then((res)=>{
      if (res?.data.success) {
          const newList = categories.filter((v)=> v.id !== category.id);
          setCategories(newList);
        }
      }).catch((e)=>console.log(e));
  },[axios,categories,setCategories]);

  

  return(
  <Box onMouseEnter={()=>setOpenEdit(true)} onMouseLeave={(()=>setOpenEdit(false))} sx={{ display: 'flex',p:1,justifyContent: 'space-between' }} id={category.id} >
    <Typography onClick={getPostsEvent} color="secondary.main" sx={{ m: 'auto 0','&:hover':{cursor:'pointer'}  }}>
      {category.title}
    </Typography>
        {openEdit &&
          <Box sx={{width:'80px'}}  >
            <EditIcon sx={{ml:2, '&:hover' : {cursor : 'pointer'}}}/>
            <CloseIcon onClick={deleteCategoryEvent} sx={{ml:2, '&:hover' : {cursor : 'pointer'}}}/>
          </Box>
        }
    </Box>
)};

CreateBox.propTypes = {
  category: PropTypes.object,
  onClose : PropTypes.func.isRequired,
};

export default CreateBox;

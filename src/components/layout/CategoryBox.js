import PropTypes from 'prop-types';
import { Box, TextField, Typography } from '@material-ui/core';
import { useCallback, useState } from 'react';
import instance from '../../atoms/axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import posts from '../../atoms/post';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { categoryList } from '../../atoms/category';
import useInput from '../../hooks/useInput';
import useOpen from '../../hooks/useOpen';
import CategoryEditButton from '../buttons/CategoryEditButton';

const CreateBox = ({ category, onClose }) => {
  const axios = useRecoilValue(instance);
  const [postList, setPostList] = useRecoilState(posts);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [openEdit, onChangeOpenEdit, setOpenEdit] = useOpen(false);
  const [onMouse, setOnMouse] = useState(false);
  const [inputCategory, onChangeInputCategory, setInputCategory] = useInput(category.title);

  const getPostsEvent = useCallback(async () => {
    const res = await axios.get(`/user/post/category/${category.id}`).catch((e) => console.log(e));
    if (res?.data?.success) {
      setPostList(res.data.response);
    }
    onClose();
  }, [axios, setPostList, category, onClose]);

  const updateCategoryEvent = useCallback(() => {
    if (category.title === inputCategory) return null;

    axios
      .patch(`/user/category/${category.id}`, {
        title: inputCategory,
      })
      .then((res) => {
        if (res?.data.success) {
          const newList = categories.slice(0, categories.length);
          const index = newList.findIndex((v) => v.id == category.id);
          newList.splice(index, 1, res.data.response);
          setCategories(newList);
        }
      })
      .catch((e) => console.log(e));
  }, [axios, inputCategory, categories, setCategories, category]);

  const deleteCategoryEvent = useCallback(() => {
    axios
      .delete(`/user/category/${category.id}`)
      .then((res) => {
        if (res?.data.success) {
          const newList = categories.filter((v) => v.id !== category.id);
          setCategories(newList);
        }
      })
      .catch((e) => console.log(e));
  }, [axios, categories, setCategories]);

  return category.id !== 1 && openEdit ? (
    <Box sx={{ display: 'flex', p: 1 }}>
      <TextField sx={{ height: '100%', backgroundColor: 'primary.second', margin: 'auto 0' }} onChange={onChangeInputCategory} value={inputCategory} />
      <Box sx={{ display: 'block', width: '50px', margin: 'auto 0' }}>
        <CategoryEditButton value="수정" onClick={updateCategoryEvent} />
        <CategoryEditButton
          value="취소"
          onClick={() => {
            setOpenEdit(false);
          }}
        />
      </Box>
    </Box>
  ) : (
    <Box onMouseEnter={() => setOnMouse(true)} onMouseLeave={() => setOnMouse(false)} sx={{ display: 'flex', p: 1, justifyContent: 'space-between' }} id={category.id}>
      <Typography onClick={getPostsEvent} color="secondary.main" sx={{ m: 'auto 0', '&:hover': { cursor: 'pointer' } }}>
        {category.title}
      </Typography>
      {category.id !== 1 && onMouse && (
        <Box sx={{ width: '80px' }}>
          <EditIcon
            onClick={() => {
              setOpenEdit(true);
            }}
            sx={{ ml: 2, '&:hover': { cursor: 'pointer' } }}
          />
          <CloseIcon onClick={deleteCategoryEvent} sx={{ ml: 2, '&:hover': { cursor: 'pointer' } }} />
        </Box>
      )}
    </Box>
  );
};

CreateBox.propTypes = {
  category: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default CreateBox;

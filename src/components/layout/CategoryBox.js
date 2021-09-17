import PropTypes from 'prop-types';
import { Box, TextField, Typography } from '@material-ui/core';
import { useCallback, useState } from 'react';
import instance from '../../atoms/axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import useInput from '../../hooks/useInput';
import useOpen from '../../hooks/useOpen';
import CategoryEditButton from '../buttons/CategoryEditButton';
import { useNavigate } from 'react-router-dom';
import { categoryList } from '../../atoms/category';
import { alertState, dialogState } from '../../atoms/alert';
import { posts } from '../../atoms/post';

const CategoryBox = ({ category,onClose }) => {
  const axios = useRecoilValue(instance);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [openEdit, onChangeOpenEdit, setOpenEdit] = useOpen(false);
  const [onMouse, setOnMouse] = useState(false);
  const [inputCategory, onChangeInputCategory, setInputCategory] = useInput(category.title);
  const navigate = useNavigate();
  const setOpenDialog = useSetRecoilState(dialogState);
  const setOpenAlert = useSetRecoilState(alertState);
  const validate = new RegExp("[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]","g");

  const getPostsEvent = useCallback(() => {
      navigate(`/category?id=${category.id}`);
      onClose();
  },[navigate,onClose,category]);

  const updateCategory = useCallback(() => {
    if (category.title === inputCategory) return null;
    if (!inputCategory) {
      setOpenAlert({
        state : true,
        message : '카테고리를 입력하셔야 합니다.',
        severity : 'error'
      });
      setOpenDialog(false);
      return;
    }else if(inputCategory.length > 20){
      setOpenAlert({
        state : true,
        message : '카테고리 길이는 최대 20자 까지 입니다.',
        severity : 'error'
      });
      setOpenDialog(false);
      return;
    }else if(validate.test(inputCategory)){
      setOpenAlert({
        state : true,
        message : '지원하지 않는 특수기호가 포함되어 있습니다.',
        severity : 'error'
      });
      setOpenDialog(false);
      return;
    }
    axios
      .put(`/user/category/${category.id}`, {
        title: inputCategory,
      })
      .then((res) => {
        if (res?.data.success) {
          const newList = categories.slice(0, categories.length);
          const index = newList.findIndex((v) => v.id === category.id);
          newList.splice(index, 1, res.data.response);
          setCategories(newList);
          navigate('/',{replace : true});
        }
      })
      .catch(error => {
        if (error.response) {
          setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
          if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
        }
        else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
      });
      setInputCategory('');
      setOpenDialog(false);
  }, [axios, inputCategory, setInputCategory,categories, setCategories,navigate, setOpenDialog,category,setOpenAlert]);

  const updateCategoryEvent = useCallback(()=>{
    setOpenDialog({
      state: true,
      message: '정말로 수정하시겠습니까?',
      event : updateCategory,
    });
  },[setOpenDialog, updateCategory]);

  const deleteCategory = useCallback(() => {
    axios
      .delete(`/user/category/${category.id}`)
      .then((res) => {
        if (res?.data.success) {
          const newList = categories.filter((v) => v.id !== category.id);
          setCategories(newList);
          navigate('/',{replace : true});
        }
      })
      .catch(error => {
        if (error.response){
          setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
          if(error.response.data.response.status === 401 ){
            navigate('/login', { replace: true });
            return;
          }
          else if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
        }
        else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
      });
      setOpenDialog(false);
  }, [axios,category, categories, setCategories,setOpenDialog,setOpenAlert,navigate]);

  const deleteCategoryEvent = useCallback(()=>{
    setOpenDialog({
      state: true,
      message: '정말로 삭제하시겠습니까? 삭제후 남아있는 문구들은 기본카테고리로 이동됩니다.',
      event : deleteCategory,
    });
  },[setOpenDialog, deleteCategory]);

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

CategoryBox.propTypes = {
  category: PropTypes.object,
  onClose : PropTypes.func,
};

export default CategoryBox;

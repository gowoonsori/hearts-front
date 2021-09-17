import MyCategoryFilter from '../filters/MyCategoryFilter';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core';
import CreateCategoryBox from '../boxes/CreateCategoryBox';
import CategoryList from './CategoryList';
import { useCallback, useState } from 'react';
import instance from '../../atoms/axios';
import useInput from '../../hooks/useInput';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryList } from '../../atoms/category';
import { alertState } from '../../atoms/alert';
import { useNavigate } from 'react-router-dom';

const BoxContainer = experimentalStyled('div')(() => ({
  padding: '8px',
}));

const SidebarContetnt = ({onClose}) => {
  const axios = useRecoilValue(instance);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [category, onChangeCategory, setCategory] = useInput('');
  const [openCreateCategoryBox, setOpenCreateCategoryBox] = useState(false);
  const setOpenAlert = useSetRecoilState(alertState);
  const navigate = useNavigate();
  const validate = new RegExp("[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]","g");

  const crateCategoryEvent = useCallback(() => {
    if (!category) {
      setOpenAlert({
        state : true,
        message : '카테고리를 입력하셔야 합니다.',
        severity : 'error'
      });
      return;
    }else if(category.length > 20){
      setOpenAlert({
        state : true,
        message : '카테고리 길이는 최대 20자 까지 입니다.',
        severity : 'error'
      });
      return;
    }else if(validate.test(category)){
      setOpenAlert({
        state : true,
        message : '지원하지 않는 특수기호가 포함되어 있습니다.',
        severity : 'error'
      });
      return;
    }
    axios
      .post('user/category', {
        title: category,
      })
      .then((res) => {
        if (res?.data.response) {
          if(categories.length === 0){
            setCategories([res.data.response]);
          }else{
            const newList = categories.slice(0, categories.length);
            newList.push(res.data.response);
            setCategories(newList);
            setCategory('');
          }
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
      setCategory('');
      setOpenCreateCategoryBox(false);
  }, [axios, category, categories, setCategory,navigate,setCategories,setOpenCreateCategoryBox,setOpenAlert]);

  const openBoxEvent = useCallback(()=>{
    setOpenCreateCategoryBox(!openCreateCategoryBox);
  },[openCreateCategoryBox,setOpenCreateCategoryBox]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <MyCategoryFilter />
      <CreateCategoryBox title="Create Category" onClick={openBoxEvent} />
      {openCreateCategoryBox && 
        <Box sx={{display:'flex', bolder: '1px solid #030303'}}>
          <TextField value={category} onChange={onChangeCategory} sx={{backgroundColor:'primary.second'}} placeholder="카테고리 이름"/>
          <Button onClick={crateCategoryEvent} sx={{backgroundColor:'primary.contrastText', color:'secondary.main', '&:hover':{backgroundColor:'primary.second'}}}>생성</Button>
        </Box>
      }
      <Typography variant="h6" color="primary.contrastText" sx={{ m: 1, mt: 4 }}>
        {' '}
        MY CATEGORIES
      </Typography>

      <BoxContainer>
        <CategoryList onClose={onClose}/>
      </BoxContainer>
    </Box>
  );
};


export default SidebarContetnt;
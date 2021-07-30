import MyCategoryFilter from '../filters/MyCategoryFilter';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core';
import CreateCategoryBox from '../boxes/CreateCategoryBox';
import CategoryList from './CategoryList';
import { useCallback, useState } from 'react';
import instance from '../../atoms/axios';
import useInput from '../../hooks/useInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryList } from '../../atoms/category';



const BoxContainer = experimentalStyled('div')(() => ({
  padding: '8px',
}));

const SidebarContetnt = ({onClose}) => {
  const axios = useRecoilValue(instance);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [category, onChangeCategory, setCategory] = useInput('');
  const [openCreateCategoryBox, setOpenCreateCategoryBox] = useState(false);

  const crateCategoryEvent = useCallback(() => {
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
          }
        }
      })
      .catch((e) => console.log(e));
      setOpenCreateCategoryBox(false);
  }, [axios, category, categories, setCategories,setOpenCreateCategoryBox]);

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

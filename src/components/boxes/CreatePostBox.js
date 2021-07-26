import { Avatar, Box, Button, Divider, TextField, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { categoryList } from '../../atoms/category';
import CategoryBox from './CategoryBox';

const CreatePostBox = () => {
  const categories = useRecoilValue(categoryList);
  const [selectCategory, setSelectCategory] = useState(null);
  const [categoryButton, setCategoryButton] = useState(null);
  const CatgoryBoxOpen = Boolean(categoryButton);

  const changeCategory = useCallback(
    (e) => {
      setSelectCategory(e.target.value);
      setCategoryButton(null);
    },
    [setSelectCategory]
  );

  const categoryButtonClick = useCallback((event) => {
    setCategoryButton(event.currentTarget);
  }, []);

  const categorySelectClose = useCallback(() => {
    setCategoryButton(null);
  }, []);

  return (
    <Box sx={{ minWidth: '280px', display: 'block', backgroundColor: 'primary.main', m: 1, mb: 3, borderRadius: '10px', p: 2, width: '98.4%' }}>
      <form sx={{ width: '100%' }}>
        <Box sx={{ display: 'inline-flex', width: '100%', mb: 2 }}>
          <Avatar sx={{ mt: 1 }} alt="Cindy Baker" />
          <TextField required sx={{ ml: 1, width: '95%', backgroundColor: 'primary.second', borderRadius: '5px' }} placeholder="문구 작성" color="secondary" multiline />
        </Box>
        <Box>
          {selectCategory && (
            <Box color="primary.contrastText">
              <Typography>카테고리 : {categories.find((v) => v.id === selectCategory).title}</Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ mt: 2, backgroundColor: 'primary.contrastText' }} />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Button onClick={categoryButtonClick} sx={{ borderRadius: '20px', width: '300px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>
            카테고리 선택
          </Button>
          <Button sx={{ borderRadius: '20px', width: '300px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>태그 추가</Button>
          <Button sx={{ borderRadius: '20px', width: '400px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>검색 노출 하기</Button>
          <Button sx={{ borderRadius: '20px', width: '300px', border: '3px solid', backgroundColor: 'primary.contrastText', color: 'primary.main', fontWeight: 800 }}>작성하기</Button>
        </Box>
      </form>
      <CategoryBox anchor={categoryButton} onClose={categorySelectClose} open={CatgoryBoxOpen} onClick={changeCategory} />
    </Box>
  );
};

export default CreatePostBox;

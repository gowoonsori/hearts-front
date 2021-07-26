import { Avatar, Box, Button, Divider, TextField, Typography } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryList } from '../../atoms/category';
import { tagList } from '../../atoms/tag';
import CategorySelectBox from './CategorySelectBox';
import TagBox from './TagBox';
import TagSelectBox from './TagSelectBox';

const CreatePostBox = () => {
  const categories = useRecoilValue(categoryList);
  const [tags, setTags] = useRecoilState(tagList);

  const deleteTagEvent = useCallback(
    (e) => {
      const newTags = tags.filter((v) => v !== e.target.id);
      setTags(newTags);
    },
    [tags, setTags]
  );

  /* for category 선택 모달 */
  const [selectCategory, setSelectCategory] = useState(null);
  const [categoryButton, setCategoryButton] = useState(null);
  const CatgoryBoxOpen = Boolean(categoryButton);

  const changeCategory = useCallback(
    (e) => {
      setSelectCategory(e.target.value);
      setCategoryButton(null);
    },
    [setSelectCategory, setCategoryButton]
  );

  const categoryButtonClick = useCallback(
    (e) => {
      setCategoryButton(e.currentTarget);
    },
    [setCategoryButton]
  );

  const categorySelectClose = useCallback(() => {
    setCategoryButton(null);
  }, [setCategoryButton]);

  /* for tag 선택 모달 */
  const [selectTag, setSelectTag] = useState(null);
  const [tagButton, setTagButton] = useState(null);
  const TagBoxOpen = Boolean(tagButton);

  const tagButtonClick = useCallback((event) => {
    setTagButton(event.currentTarget);
  }, []);

  const tagSelectClose = useCallback(() => {
    setTagButton(null);
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
        <Box sx={{ display: 'inline-flex' }}>{tags && tags.map((tag, index) => <TagBox key={index} id={index} tag={tag} deleteEvent={deleteTagEvent}></TagBox>)}</Box>
        <Divider sx={{ mt: 2, backgroundColor: 'primary.contrastText' }} />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Button onClick={categoryButtonClick} sx={{ borderRadius: '20px', width: '300px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>
            카테고리 선택
          </Button>
          <Button onClick={tagButtonClick} sx={{ borderRadius: '20px', width: '300px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>
            태그 추가
          </Button>
          <Button sx={{ borderRadius: '20px', width: '400px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>검색 노출 하기</Button>
          <Button sx={{ borderRadius: '20px', width: '300px', border: '3px solid', backgroundColor: 'primary.contrastText', color: 'primary.main', fontWeight: 800 }}>작성하기</Button>
        </Box>
      </form>
      <CategorySelectBox anchor={categoryButton} onClose={categorySelectClose} open={CatgoryBoxOpen} onClick={changeCategory} />
      <TagSelectBox anchor={tagButton} onClose={tagSelectClose} open={TagBoxOpen} />
    </Box>
  );
};

export default CreatePostBox;

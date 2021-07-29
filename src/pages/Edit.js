import { Avatar, Box, Button, Container, Divider, TextField, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryList } from '../atoms/category';
import { tagList } from '../atoms/tag';
import CategorySelectBox from '../components/boxes/CategorySelectBox';
import TagBox from '../components/boxes/TagBox';
import TagSelectBox from '../components/boxes/TagSelectBox';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useInput from '../hooks/useInput';
import instance from '../atoms/axios';
import {editPost} from '../atoms/post';
import useOpen from '../hooks/useOpen';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const post = useRecoilValue(editPost);
  const axios = useRecoilValue(instance);
  const categories = useRecoilValue(categoryList);
  const [content, onChangeContent, setContent] = useInput(post.content);
  const [selectCategory, setSelectCategory] = useState(post.category_id);
  const [tags, setTags] = useRecoilState(tagList);
  const [search, onChangeSearchEvent, setSearch] = useOpen(post.search);
  const navigate = useNavigate();
  
  useEffect(()=> {
    setTags(JSON.parse(post.tags));
  },[]);

  /* 문구 등록 버튼 */
  const createPost = useCallback(() => {
    if (!selectCategory || !content) return null;
    axios
      .patch(`/user/post/${post.id}`, {
        content: content,
        search: search,
        category_id: selectCategory,
        tags: tags,
      })
      .then((res) => {
        if (res.data.success) {
            setTags([]);
            navigate('/');
          }
        })
      .catch((e) => console.log(e));
  }, [axios, post,content, search, selectCategory, tags,setTags,navigate]);

  /* for category 선택 모달 */
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
  const [tagButton, setTagButton] = useState(null);
  const TagBoxOpen = Boolean(tagButton);

  const tagButtonClick = useCallback((event) => {
    setTagButton(event.currentTarget);
  }, []);

  const tagSelectClose = useCallback(() => {
    setTagButton(null);
  }, []);

  const deleteTagEvent = useCallback(
    (e) => {
      const newTags = tags.filter((v) => v.tag !== e.target.id);
      console.log(tags);
      console.log(e.target.id);
      console.log(newTags);
      setTags(newTags);
    },
    [tags, setTags]
  );

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <Box sx={{ minWidth: '280px', display: 'block', backgroundColor: 'primary.main', m: 1, mb: 3, borderRadius: '10px', p: 2, width: '98.4%', pb: 7 }}>
        <form sx={{ width: '100%' }}>
          <Box sx={{ display: 'inline-flex', width: '100%', mb: 2 }}>
            <Avatar sx={{ mt: 1 }} alt="Cindy Baker" />
            <TextField
              onChange={onChangeContent}
              value={content}
              required
              sx={{ ml: 1, width: '95%', backgroundColor: 'primary.second', borderRadius: '5px' }}
              placeholder="문구 작성"
              color="secondary"
              multiline
            />
          </Box>
          <Box>
            {selectCategory && (
              <Box color="primary.contrastText">
                <Typography>카테고리 : {categories.find((v) => v.id === selectCategory).title}</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'inline-flex' }}>{tags && tags.map((tag, index) => <TagBox key={index} tag={tag} deleteEvent={deleteTagEvent}></TagBox>)}</Box>
          <Box sx={{ display: 'flex', mt: 5 }}>
            <Button onClick={categoryButtonClick} sx={{ mx: 1, borderRadius: '20px', border: '1px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>
              카테고리 선택
            </Button>
            <Button onClick={tagButtonClick} sx={{ mx: 1, borderRadius: '20px', border: '1px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>
              태그 추가
            </Button>
            {search ? (
              <Button
                onClick={onChangeSearchEvent}
                sx={{
                  mx: 1,
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: '#ff585b',
                  backgroundColor: '#ff585b',
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': { borderColor: '#ff585b', backgroundColor: '#ff585b', color: 'primary.main' },
                }}
              >
                <CheckIcon />
                검색 노출
              </Button>
            ) : (
              <Button onClick={onChangeSearchEvent} sx={{ mx: 1, borderRadius: '20px', border: '1px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>
                <CloseIcon />
                검색 노출
              </Button>
            )}
          </Box>
          <Divider sx={{ my: 3, backgroundColor: 'primary.contrastText' }} />
          <Button
            onClick={createPost}
            sx={{
              float: 'right',
              borderRadius: '20px',
              width: '300px',
              backgroundColor: 'primary.contrastText',
              color: 'secondary.main',
              fontWeight: 800,
              '&:hover': { backgroundColor: 'primary.second' },
            }}
          >
            작성하기
          </Button>
        </form>
        <CategorySelectBox anchor={categoryButton} onClose={categorySelectClose} open={CatgoryBoxOpen} onClick={changeCategory} />
        <TagSelectBox anchor={tagButton} onClose={tagSelectClose} open={TagBoxOpen} />
      </Box>
    </Container>
  );
};

export default Edit;

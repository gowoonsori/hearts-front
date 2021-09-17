import { Avatar, Box, Button, Divider, TextField, Typography } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryList } from '../../atoms/category';
import { tagList } from '../../atoms/tag';
import CategorySelectBox from './CategorySelectBox';
import TagBox from './TagBox';
import TagSelectBox from './TagSelectBox';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useInput from '../../hooks/useInput';
import instance from '../../atoms/axios';
import { posts } from '../../atoms/post';
import useOpen from '../../hooks/useOpen';
import { alertState } from '../../atoms/alert';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const CreatePostBox = () => {
  const axios = useRecoilValue(instance);
  const [postList, setPostList] = useRecoilState(posts);
  const categories = useRecoilValue(categoryList);
  const [content, onChangeContent, setContent] = useInput('');
  const [selectCategory, setSelectCategory] = useState(null);
  const [tags, setTags] = useRecoilState(tagList);
  const [search, onChangeSearchEvent, setSearch] = useOpen(true);
  const setOpenAlert = useSetRecoilState(alertState);
  const navigate = useNavigate();

  /* 문구 등록 버튼 */
  const createPost = useCallback(() => {
    if (!selectCategory || !content || content.trim() === '') {
      setOpenAlert({
        state: true,
        message: '문구와 카테고리 모두 입력하셔야 합니다.',
        severity: 'error'
      });
      return;
    } else if (content.length > 200) {
      setOpenAlert({
        state: true,
        message: '문구 길이는 최대 200자 까지 입니다.',
        severity: 'error'
      });
      return;
    }

    
    axios
      .post('/user/post', {
        content: content.trim(),
        search: search,
        category_id: selectCategory,
        tags: tags,
      }).then((res) => {
        if (res.data.success) {
          if (!postList || postList?.length === 0) {
            setPostList([res.data.response]);
          } else {
            const newPostList = postList.slice(0, postList.length);
            newPostList.unshift(res.data.response);
            setPostList(newPostList);
          }
        }
      })
      .catch(error => {
        if (error.response) {
          setOpenAlert({ state: true, message: error.response.data.response.message, severity: 'error' });
          if (error.response.data.response.status === 401) {
            navigate('/login', { replace: true });
            return;
          }
          else if (error.response.data.response.status === 500) navigate('/', { replace: true });
        }
        else setOpenAlert({ state: true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
      });


    setContent('');
    setSelectCategory(null);
    setTags([]);
  }, [axios, content, search, selectCategory, tags, postList, navigate, setPostList, setTags, setContent, setOpenAlert]);

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
      setTags(newTags);
    },
    [tags, setTags]
  );

  return (
    <Box sx={{ minWidth: '280px', display: 'block', backgroundColor: 'primary.main', mb: 3, borderRadius: '10px', p: 2, width: '100%', pb: 7 }}>
      <Box sx={{ display: 'inline-flex', width: '100%', mb: 2 }}>
        <Avatar sx={{ mt: 1 }} alt="Cindy Baker" />
        <TextField
          onChange={onChangeContent}
          value={content}
          required
          sx={{ ml: 1, width: '95%', backgroundColor: 'primary.second', borderRadius: '5px',maxHeight: '400px',overflow:'auto'}}
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
      <Box sx={{ display: 'flex', float: 'right' }}>
        <CircularProgress sx={{ color: '#ff585b', mx: 2 }} variant="determinate" value={content.length / 2} />
        <Button
          onClick={createPost}
          sx={{
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
      </Box>
      <CategorySelectBox anchor={categoryButton} onClose={categorySelectClose} open={CatgoryBoxOpen} onClick={changeCategory} />
      <TagSelectBox anchor={tagButton} onClose={tagSelectClose} open={TagBoxOpen} />
    </Box>
  );
};

export default CreatePostBox;
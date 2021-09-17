import { Avatar, Box, Button, Container, Divider, TextField, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryList } from '../atoms/category';
import { tagList } from '../atoms/tag';
import CategorySelectBox from '../components/boxes/CategorySelectBox';
import TagBox from '../components/boxes/TagBox';
import TagSelectBox from '../components/boxes/TagSelectBox';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useInput from '../hooks/useInput';
import instance from '../atoms/axios';
import { editPost } from '../atoms/post';
import { alertState, dialogState } from '../atoms/alert';
import useOpen from '../hooks/useOpen';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Edit = () => {
  const post = useRecoilValue(editPost);
  const axios = useRecoilValue(instance);
  const categories = useRecoilValue(categoryList);
  const [tags, setTags] = useRecoilState(tagList);
  const setOpenDialog = useSetRecoilState(dialogState);
  const [content, onChangeContent, setContent] = useInput(post?.content);
  const [selectCategory, setSelectCategory] = useState(post?.category_id);
  const [search, onChangeSearchEvent, setSearch] = useOpen(post?.search);
  const setOpenAlert = useSetRecoilState(alertState);
  const navigate = useNavigate();

  //뒤로가기 방지
  const preventGoBack = useCallback(() => {
    // change start
    setOpenDialog({
      state: true,
      message: "정말로 뒤로 가시겠습니까? 뒤로가기 시 작성하신 데이터는 모두 날라갑니다.",
      event: function () {
        navigate(-2);
        setOpenDialog(false);
        setTags([]);
      },
    });
    navigate('.')
  }, [navigate, setOpenDialog,setTags]);


  useEffect(() => {
    if (!post) navigate('/', { replace: true });
    else {
      setTags(post.tags ?? []);
      navigate('.');
      window.addEventListener('popstate', preventGoBack);
      return () => window.removeEventListener('popstate', preventGoBack);
    }
  }, []);


  /* 문구 등록 버튼 */
  const updatePost = useCallback(() => {
    if (!selectCategory || !content) {
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
    };

    axios
      .put(`/user/post/${post?.id}`, {
        content: content.trim(),
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
  }, [axios, post, content, search, selectCategory, tags, setTags, navigate, setOpenAlert]);

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
    <Container sx={{ mt: 3 }} maxWidth="md">
      <Box sx={{ minWidth: '280px', display: 'block', backgroundColor: 'primary.main', m: 1, mb: 3, borderRadius: '10px', p: 2, width: '98.4%', pb: 7 }}>
        <Box sx={{ display: 'inline-flex', width: '100%', mb: 2 }}>
          <Avatar sx={{ mt: 1 }} alt="Cindy Baker" />
          <TextField
            onChange={onChangeContent}
            value={content?? ''}
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
              <Typography>카테고리 : {categories.find((v) => v.id === selectCategory)?.title}</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'inline-flex' }}>{tags.map((tag, index) => <TagBox key={index} tag={tag} deleteEvent={deleteTagEvent}></TagBox>)}</Box>
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
          <CircularProgress sx={{ color: '#ff585b', mx: 2 }} variant="determinate" value={content?.length / 2} />
          <Button
            onClick={updatePost}
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
    </Container>
  );
};

export default Edit;

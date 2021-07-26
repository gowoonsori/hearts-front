import { Avatar, Box, Button, Divider, TextField } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { categoryList } from '../../atoms/category';

const CreatePostBox = () => {
  const categories = useRecoilValue(categoryList);

  return (
    <Box sx={{ minWidth: '280px', display: 'block', backgroundColor: 'primary.main', m: 1, mb: 3, borderRadius: '10px', p: 2, width: '98.4%' }}>
      <form sx={{ width: '100%' }}>
        <Box sx={{ display: 'inline-flex', width: '100%', mb: 2 }}>
          <Avatar sx={{ mt: 1 }} alt="Cindy Baker" />
          <TextField required sx={{ ml: 1, width: '95%', backgroundColor: 'primary.second', borderRadius: '5px' }} placeholder="문구 작성" color="secondary" multiline />
        </Box>
        <Divider sx={{ backgroundColor: 'primary.contrastText' }} />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Button sx={{ borderRadius: '20px', width: '300px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>카테고리 선택</Button>
          <Button sx={{ borderRadius: '20px', width: '300px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>태그 추가</Button>
          <Button sx={{ borderRadius: '20px', width: '400px', border: '3px solid', borderColor: 'primary.contrastText', color: 'primary.contrastText', fontWeight: 600 }}>검색 노출 하기</Button>
          <Button sx={{ borderRadius: '20px', width: '300px', border: '3px solid', backgroundColor: 'primary.contrastText', color: 'primary.main', fontWeight: 800 }}>작성하기</Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreatePostBox;

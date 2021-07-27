import PropTypes from 'prop-types';
import MyCategoryFilter from '../filters/MyCategoryFilter';
import { Box, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core';
import CreateCategoryBox from '../boxes/CreateCategoryBox';
import CategoryList from './CategoryList';
import { useCallback } from 'react';
import instance from '../../atoms/axios';
import useInput from '../../hooks/useInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryList } from '../../atoms/category';

const BoxContainer = experimentalStyled('div')(() => ({
  padding: '8px',
}));

const SidebarContetnt = ({ onClose }) => {
  const axios = useRecoilValue(instance);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [category, onChangeCategory, setCategory] = useInput('');

  const crateCategoryEvent = useCallback(() => {
    axios
      .post('user/category', {
        title: category,
      })
      .then((res) => {
        if (res?.data.response) {
          const newList = categories.splice(0, categories.length);
          newList.push(res.data.response);
          setCategories(newList);
        }
      })
      .catch((e) => console.log(e));
  }, [axios, category, categories, setCategories]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <MyCategoryFilter />
      <CreateCategoryBox title="Create Category" />

      <Typography variant="h6" color="primary.contrastText" sx={{ m: 1, mt: 4 }}>
        {' '}
        MY CATEGORIES
      </Typography>

      <BoxContainer>
        <CategoryList onClose={onClose} />
      </BoxContainer>
    </Box>
  );
};

SidebarContetnt.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SidebarContetnt;

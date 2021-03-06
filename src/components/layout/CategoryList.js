import { Box } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { categoryFilterList } from '../../atoms/category';
import CategoryBox from './CategoryBox';

const CategoryList = ({onClose}) => {
  const categories = useRecoilValue(categoryFilterList);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {categories.map((category) => (
        <CategoryBox key={category.id} category={category} onClose={onClose}></CategoryBox>
      ))}
    </Box>
  );
};

export default CategoryList;

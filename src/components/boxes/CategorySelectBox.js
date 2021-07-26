import { Box, List, ListItem, Popover } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { categoryList } from '../../atoms/category';
import PropTypes from 'prop-types';

const CategorySelectBox = ({ anchor, onClose, open, onClick }) => {
  const categories = useRecoilValue(categoryList);
  return (
    <Popover
      anchorEl={anchor}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={{ border: '1px solid', borderColor: 'primary.contrastText', width: '200px', backgroundColor: 'primary.main', color: 'secondary.main' }}>
        <List>
          {categories.map((category) => (
            <ListItem sx={{ '&:hover': { cursor: 'pointer', backgroundColor: 'ternary.main' } }} key={category.id} onClick={onClick} value={category.id}>
              {category.title}
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  );
};

CategorySelectBox.propTypes = {
  anchor: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default CategorySelectBox;

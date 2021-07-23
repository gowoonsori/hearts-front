import PropTypes from 'prop-types';
import MyCategoryFilter from '../filters/MyCategoryFilter';
import { Box, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core';
import CreateBox from '../boxes/CreateBox';
import CategoryList from './CategoryList';

const BoxContainer = experimentalStyled('div')(() => ({
  padding: '8px',
}));

const SidebarContetnt = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <MyCategoryFilter />
    <CreateBox title="Create Category" />

    <Typography variant="h6" color="primary.contrastText" sx={{ m: 1, mt: 4 }}>
      {' '}
      MY CATEGORIES
    </Typography>

    <BoxContainer>
      <CategoryList />
    </BoxContainer>
  </Box>
);

SidebarContetnt.propTypes = {
  items: PropTypes.array,
  userInfo: PropTypes.object,
};

export default SidebarContetnt;

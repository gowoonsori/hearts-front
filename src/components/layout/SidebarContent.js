import PropTypes from 'prop-types';
import MyCommunityFilter from '../filters/MyCommunityFilter';
import { Box, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core';
import CreateBox from '../boxes/CreateBox';

const BoxContainer = experimentalStyled('div')(() => ({
  padding: '8px'
}));

const SidebarContetnt = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
  >
    <MyCommunityFilter />
    <CreateBox title='Create Category'/>
    
    <Typography variant="h6" color='primary.contrastText' sx={{ m: 1,mt:4 }} > MY CATEGORIES</Typography>

    <BoxContainer>
    </BoxContainer>
  </Box>
);

SidebarContetnt.propTypes = {
  items: PropTypes.array,
  userInfo: PropTypes.object
};

export default SidebarContetnt;

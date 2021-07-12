import PropTypes from 'prop-types';
import MyCommunityFilter from '../filters/MyCommunityFilter';
import { Box,  Typography  } from '@material-ui/core';
import CreateCommunityBox from '../boxes/CreateCommunityBox';
import {experimentalStyled} from '@material-ui/core';

const CommunitiesContainer = experimentalStyled('div')(() => ({
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
     
 
    <Typography variant="h6" color='primary.contrastText' sx={{m:1}} > MY COMMUNITIES</Typography>
    <Box>
      <CommunitiesContainer>
        <CreateCommunityBox/>
      </CommunitiesContainer>
    </Box>
  </Box>
);

SidebarContetnt.propTypes = {
  items: PropTypes.array,
  userInfo: PropTypes.object
};

export default SidebarContetnt;

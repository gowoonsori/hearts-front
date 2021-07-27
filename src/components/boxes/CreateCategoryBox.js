import { Box, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

const CreateCategoryBox = ({ title, onClick }) => (
  <Box sx={{ display: 'flex', m: 1 }} onClick={onClick}>
    <AddIcon sx={{ fontSize: '2em', color: 'secondary.main' }} />
    <Typography color="secondary.main" sx={{ m: 'auto 0' }}>
      {title}
    </Typography>
  </Box>
);

CreateCategoryBox.propTypes = {
  title : PropTypes.string.isRequired,
  onClick : PropTypes.func,
}

export default CreateCategoryBox;

import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const CreateBox = ({ category }) => (
  <Box sx={{ display: 'flex', m: 1 }} id={category.id}>
    <Typography color="secondary.main" sx={{ m: 'auto 0' }}>
      {category.title}
    </Typography>
  </Box>
);

CreateBox.propTypes = {
  category: PropTypes.object,
};

export default CreateBox;

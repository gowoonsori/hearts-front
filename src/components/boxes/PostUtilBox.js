import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const PostUtilBox = ({ Icon, text, onClick }) => {
  return (
    <Box sx={{ display: 'inline-flex', mr: 2 }}>
      <Icon sx={{ mr: 2, '&:hover': { cursor: 'pointer' } }} onClick={onClick} />
      <Typography>{text}</Typography>
    </Box>
  );
};

PostUtilBox.propTypes = {
  Icon: PropTypes.object.isRequired,
  text: PropTypes.number,
  onClick: PropTypes.func,
};

export default PostUtilBox;

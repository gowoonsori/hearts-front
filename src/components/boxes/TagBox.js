import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

const TagBox = ({ id, tag, onClick, deleteEvent }) => {
  //const randomColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  const randomColor = ((Math.random() * 360) % 360).toString(10);
  return (
    <Box
      sx={{ margin: '3px', display: 'flex', padding: '3px 5px', borderRadius: '2px', backgroundColor: 'hsl(' + randomColor + ',35%,50%)', color: 'secondary.main', '&:hover': { cursor: 'pointer' } }}
    >
      <Typography sx={{ fontWeight: 600 }} variant="h6" onClick={onClick}>
        {tag}
      </Typography>
      {deleteEvent && <CloseIcon id={tag} onClick={deleteEvent} />}
    </Box>
  );
};

TagBox.propTypes = {
  id: PropTypes.number,
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  deleteEvent: PropTypes.func,
};

export default TagBox;

import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

const TagBox = ({ tag, onClick, deleteEvent }) => {
  return (
    <Box sx={{ margin: '3px', display: 'flex', padding: '3px 5px', borderRadius: '2px', backgroundColor: 'hsl(' + tag.color + ',35%,50%)', color: 'secondary.main', '&:hover': { cursor: 'pointer' } }}>
      <Typography sx={{ fontWeight: 600 }} variant="h6" onClick={onClick}>
        {tag.tag}
      </Typography>
      {deleteEvent && <CloseIcon id={tag.tag} onClick={deleteEvent} />}
    </Box>
  );
};

TagBox.propTypes = {
  tag: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  deleteEvent: PropTypes.func,
};

export default TagBox;

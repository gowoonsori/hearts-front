import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import TagBox from '../boxes/TagBox';

const TagList = ({ tags }) => {
  return <Box sx={{ display: 'inline-flex', p: 0, m: 2, ml: 0, mb: 1 }}>{tags.length > 0 && tags.map((tag, index) => <TagBox key={index} tag={tag} />)}</Box>;
};

TagList.propTypes = {
  tags: PropTypes.array,
};

export default TagList;

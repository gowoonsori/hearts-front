import { Box } from '@material-ui/core';
import '../../css/filter.css';
import SearchIcon from '@material-ui/icons/Search';

const PostFilter = () => (
  <Box
    sx={{
      p: 1,
      display: 'flex',
      width: '50%',
      minWidth: '160px',
      m: '0 auto',
      color: 'seconary.main',
      border: 'solid 2px #757575',
      '&:hover': {
        borderColor: 'secondary.main',
      },
    }}
  >
    <SearchIcon sx={{ fontSize: '2em', m: 'auto 0' }} />
    <input className="filter-input" placeholder="Search" />
  </Box>
);

export default PostFilter;

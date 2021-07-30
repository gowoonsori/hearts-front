import { Box } from '@material-ui/core';
import '../../css/filter.css';
import SearchIcon from '@material-ui/icons/Search';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';

const PostFilter = () => {
  const navigate = useNavigate();
  const [searchWord, onChangeSearchEvent, setSearchWord] = useInput('');

  const onSearchEvent = useCallback(()=>{
    if(searchWord) navigate(`/search?keyword=${searchWord}`);
  },[searchWord,navigate]);

  const onEnterPressEvent = useCallback((e)=>{
    if(e.key === 'Enter') onSearchEvent();
  },[onSearchEvent]);

  return (
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
    <input value={searchWord} onKeyPress={onEnterPressEvent} onChange={onChangeSearchEvent} className="filter-input" autoFocus placeholder="Search" />
  </Box>
)};

export default PostFilter;

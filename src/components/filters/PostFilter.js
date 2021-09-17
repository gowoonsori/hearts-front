import { Box, Select, MenuItem } from '@material-ui/core';
import '../../css/filter.css';
import SearchIcon from '@material-ui/icons/Search';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';

const PostFilter = () => {
  const navigate = useNavigate();
  const [searchWord, onChangeSearchEvent, setSearchWord] = useInput('');
  const [searchField,onChangeSearchField,setSearchField] = useInput('total');

  const onSearchEvent = useCallback(()=>{
    if(searchWord.trim() === ''){
      return;
    }
    if(searchWord) navigate(`/search/${searchField}?keyword=${searchWord.trim()}`);
    setSearchWord('');
  },[searchWord,navigate,searchField]);

  const onEnterPressEvent = useCallback((e)=>{
    if(e.key === 'Enter') onSearchEvent();
  },[onSearchEvent]);

  return (
  <Box
    sx={{
      p: 1,
      pl : 2,
      display: 'flex',
      width: '53%',
      minWidth: '250px',
      m: '0 auto',
      color: 'seconary.main',
      border: 'solid 2px #757575',
      '&:hover': {
        borderColor: 'secondary.main',
      },
    }}
  >
    <Select id="field-select" value={searchField} onChange={onChangeSearchField} sx={{mr:2, width: '120px'}}>
      <MenuItem value="total">통합검색</MenuItem>
      <MenuItem value="category">카테고리</MenuItem>
      <MenuItem value="post">문구</MenuItem>
      <MenuItem value="tag">태그</MenuItem>
    </Select>
    <input value={searchWord} onKeyPress={onEnterPressEvent} onChange={onChangeSearchEvent} className="filter-input" autoFocus placeholder="Search" />
    <SearchIcon sx={{ fontSize: '2em', m: 'auto 0', '&:hover' : {cursor:'pointer'} }} onClick={onSearchEvent}/>
  </Box>
)};

export default PostFilter;

import { Box } from '@material-ui/core';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { categoryFilterValue } from '../../atoms/category';

const MyCategoryFilter = () => {
  const [filter, setFilter] = useRecoilState(categoryFilterValue);
  const onchageEvent = useCallback(
    (e) => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  return (
    <Box
      sx={{
        p: 1,
        m: 2,
        color: 'seconary.main',
        border: 'solid 2px #757575',
        '&:hover': {
          borderColor: 'secondary.main',
        },
      }}
    >
      <input className="filter-input" placeholder="filter" value={filter} onChange={onchageEvent}></input>
    </Box>
  );
};

export default MyCategoryFilter;

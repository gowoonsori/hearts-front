import { useCallback, useRef } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../css/filter.css';
import instance from '../../atoms/axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import posts from '../../atoms/post';

const CopyBox = ({ id, Icon, content }) => {
  const copyRef = useRef();
  const [postList, setPostList] = useRecoilState(posts);
  const axios = useRecoilValue(instance);

  const copyEvent = useCallback(async () => {
    copyRef.current.select();
    document.execCommand('copy');
    const res = await axios.patch(`/user/post/${id}/share`);
    if (res.data.success) {
      const newList = postList.slice(0, postList.length);
      const index = newList.findIndex((e) => e.id === id);
      newList.splice(index, 1, res.data.response);
      setPostList(newList);
    }
  }, [copyRef, postList, setPostList, axios, id]);

  return (
    <Box sx={{ display: 'inline-flex', mr: 2 }}>
      <textarea className="cilpboard-textarea" readOnly value={content} ref={copyRef} />
      <Icon sx={{ zIndex: 10, mr: 2, '&:hover': { cursor: 'pointer' } }} onClick={copyEvent} />
    </Box>
  );
};

CopyBox.propTypes = {
  id: PropTypes.number.isRequired,
  Icon: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
};

export default CopyBox;

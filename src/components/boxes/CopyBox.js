import { useCallback, useRef } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../css/filter.css';
import instance from '../../atoms/axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {posts} from '../../atoms/post';
import { alertState } from '../../atoms/alert';
import { useNavigate } from 'react-router-dom';

const CopyBox = ({ id, Icon, content,onClick }) => {
  const copyRef = useRef();
  const [postList, setPostList] = useRecoilState(posts);
  const axios = useRecoilValue(instance);
  const setOpenAlert = useSetRecoilState(alertState);
  const navigate = useNavigate();

  const copyEvent = useCallback(() => {
    copyRef.current.select();
    document.execCommand('copy');
    axios.patch(`/user/post/${id}/share`)
    .then(res => {
      if (res.data.success) {
        onClick();
        setOpenAlert({
          state : true,
          message : '복사되었습니다.',
          severity: 'success',
        });
      }
    })
    .catch(error => {
      if (error.response) {
        setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
        if(error.response.data.response.status === 401 ){
          navigate('/login', { replace: true });
          return;
        }
        else if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
      }
      else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
    });
  }, [copyRef, postList, setPostList, axios, id,setOpenAlert,navigate,onClick]);

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
  onClick : PropTypes.func.isRequired,
};

export default CopyBox;

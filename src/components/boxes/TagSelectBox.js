import { useCallback, useState } from 'react';
import { Box, Popover, TextField, Typography } from '@material-ui/core';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { tagList } from '../../atoms/tag';
import TagBox from './TagBox';
import { alertState } from '../../atoms/alert';

const TagSelectBox = ({ anchor, onClose, open }) => {
  const [tags, setTags] = useRecoilState(tagList);
  const [createTag, setCreateTag] = useState('');
  const randomColor = () => Math.ceil((Math.random() * 360) % 360).toString(10);
  const [createTagObject, setCreateTagObject] = useState({});
  const [currentColor, setCurrentColor] = useState(Number.parseInt(randomColor()));
  const setOpenAlert = useSetRecoilState(alertState);

  const onChangeTag = useCallback(
    (e) => {
      setCreateTagObject({
        tag: e.target.value,
        color: currentColor,
      });
      setCreateTag(e.target.value);
    },
    [randomColor, setCreateTag, currentColor, setCurrentColor, setCreateTagObject]
  );

  const createTagEvent = useCallback(() => {
    if(createTag.length > 12) {
      setOpenAlert({state : true, message : "tag는 최대 12자까지 입력이 가능합니다.", severity : 'error' });
      return;
    }else if(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/.test(createTag) === true){
      setOpenAlert({state : true, message : "Tag는 공백제외한 문자와 숫자만 입력이 가능합니다.", severity : 'error' });
      return;
    }else if(tags.length === 5){
      setOpenAlert({state : true, message : "Tag는 최대 5개까지 입력이 가능합니다.", severity : 'error' });
      return;
    }else if(tags.find((e) => e.tag === createTag) !== undefined){
      setCreateTag('')
      return;
    }
    
    const newTags = [...tags, createTagObject];
    setTags(newTags);
    setCreateTag('');
    setCurrentColor(Number.parseInt(randomColor()));
  }, [createTag]);

  const onEnterPress = (e) => {
      if (e.key === 'Enter') createTagEvent();
  };


  const deleteTagEvent = useCallback(() => {
    setCreateTag('');
  }, [setCreateTag]);


  return (
    <Popover
      anchorEl={anchor}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={{ border: '1px solid #303030', width: '200px', backgroundColor: 'primary.main', color: 'secondary.main' }}>
        <TextField autoFocus placeholder="태그 입력" value={createTag} onChange={onChangeTag} onKeyPress={onEnterPress} />
        <Box sx={{ width: '100%', display: 'inline-flex', p: 1, backgroundColor: 'primary.second' }}>
          <Typography sx={{ fontWeight: 700, margin: 'auto 0', ml: 1, mr: 2 }} variant="h5">
            생성{' '}
          </Typography>
          {createTag && <TagBox tag={createTagObject} onClick={createTagEvent} deleteEvent={deleteTagEvent} />}
        </Box>
      </Box>
    </Popover>
  );
};

TagSelectBox.propTypes = {
  anchor: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default TagSelectBox;

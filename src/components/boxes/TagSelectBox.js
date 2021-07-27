import { useCallback, useState } from 'react';
import { Box, Popover, TextField, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { tagList } from '../../atoms/tag';
import TagBox from './TagBox';

const TagSelectBox = ({ anchor, onClose, open }) => {
  const [tags, setTags] = useRecoilState(tagList);
  const [createTag, setCreateTag] = useState('');
  const randomColor = useCallback(() => Math.ceil((Math.random() * 360) % 360).toString(10), []);
  const [createTagObject, setCreateTagObject] = useState({});
  const [currentColor, setCurrentColor] = useState(Number.parseInt(randomColor()));

  const onChangeTag = useCallback(
    (e) => {
      if (!currentColor) {
        setCurrentColor(Number.parseInt(randomColor()));
      }
      setCreateTagObject({
        tag: e.target.value,
        color: currentColor,
      });
      setCreateTag(e.target.value);
    },
    [randomColor, setCreateTag, currentColor, setCurrentColor, setCreateTagObject]
  );

  const createTagEvent = useCallback(() => {
    if (!tags.find((e) => e === createTag)) {
      const newTags = [...tags, createTagObject];
      setTags(newTags);
    }
    setCreateTag('');
    setCurrentColor(null);
  }, [tags, createTag, setTags, createTagObject, setCreateTag, setCurrentColor]);

  const onEnterPress = useCallback(
    (e) => {
      if (e.key === 'Enter') createTagEvent();
    },
    [createTagEvent]
  );

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

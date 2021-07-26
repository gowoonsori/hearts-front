import { useCallback } from 'react';
import { Box, Popover, TextField, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { tagList } from '../../atoms/tag';
import TagBox from './TagBox';
import useInput from '../../hooks/useInput';

const TagSelectBox = ({ anchor, onClose, open }) => {
  const [tags, setTags] = useRecoilState(tagList);
  const [createTag, onChangeTag, setCreateTag] = useInput('');

  const createTagEvent = useCallback(() => {
    if (!tags.find((e) => e === createTag)) {
      const newTags = [...tags, createTag];
      setTags(newTags);
    }
    setCreateTag('');
  }, [tags, createTag, setTags, setCreateTag]);

  const onEnterPress = useCallback(
    (e) => {
      if (e.key === 'Enter') createTagEvent();
    },
    [createTagEvent]
  );

  const deleteTagEvent = () => {
    setCreateTag('');
  };

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
          {createTag && <TagBox tag={createTag} onClick={createTagEvent} deleteEvent={deleteTagEvent} />}
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

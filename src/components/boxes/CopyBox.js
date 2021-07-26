import { useCallback, useRef } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../css/filter.css';

const CopyBox = ({ Icon, content }) => {
  const copyRef = useRef();

  const copyEvent = useCallback(() => {
    copyRef.current.select();
    document.execCommand('copy');
  }, [copyRef]);

  return (
    <Box sx={{ display: 'inline-flex', mr: 2 }}>
      <textarea className="cilpboard-textarea" readOnly value={content} ref={copyRef} />
      <Icon sx={{ zIndex: 10, mr: 2, '&:hover': { cursor: 'pointer' } }} onClick={copyEvent} />
    </Box>
  );
};

CopyBox.propTypes = {
  Icon: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
};

export default CopyBox;

import { Box, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const CreateBox = ({ title }) => (
  <Box sx={{ display: 'flex', m: 1 }}>
    <AddIcon sx={{ fontSize: '2em', color: 'secondary.main' }} />
    <Typography color="secondary.main" sx={{ m: 'auto 0' }}>
      {title}
    </Typography>
  </Box>
);

export default CreateBox;

import { Box, Typography } from '@material-ui/core';

const TagBox = ({ tag }) => {
  //const randomColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  const randomColor = ((Math.random() * 360) % 360).toString(10);
  return (
    <Box sx={{ margin: '3px', padding: '3px 5px', borderRadius: '2px', backgroundColor: 'hsl(' + randomColor + ',35%,50%)', color: 'secondary.main' }}>
      <Typography sx={{ fontWeight: 600 }} variant="h6">
        {tag}
      </Typography>
    </Box>
  );
};

export default TagBox;

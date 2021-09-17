import { Box } from '@material-ui/core';

const RandomColorBox = ({ child }) => {
  const randomColor = ((Math.random() * 360) % 360).toString(10);
  return <Box sx={{ margin: '3px', padding: '3px 5px', borderRadius: '2px', backgroundColor: 'hsl(' + randomColor + ',35%,50%)', color: 'secondary.main' }}> {child} </Box>;
};

export default RandomColorBox;

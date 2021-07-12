import { Box, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const CreateCommunityBox = () => (
    <Box sx={{display: 'flex'}}
    >
        <AddIcon sx={{fontSize:"2em", color:'secondary.main' }} color='seconary.main' />
        <Typography color='secondary.main' sx={{ m: 'auto 0'}} >Create Community</Typography>
    </Box>
);

export default CreateCommunityBox;

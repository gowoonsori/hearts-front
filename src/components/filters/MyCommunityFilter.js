import { Box } from '@material-ui/core';

const MyCommunityFilter = () => (
    <Box sx={{ 
        p: 1,
        m: 2,
        color: "seconary.main",
        border: "solid 2px #757575",
        '&:hover':{
            borderColor: 'secondary.main'
        }
        }}
    >
        <input class="community-filter-input" placeholder="filter">
        </input>
    </Box>
);

export default MyCommunityFilter;

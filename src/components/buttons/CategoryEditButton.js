import { Typography } from "@material-ui/core";

const CategoryEditButton = ({value, onClick}) => {

    return (
        <Typography sx={{p:1,py:'2px',width:'50px', fontSize:'1em',color:'secondary.main','&:hover':{color:'#ff585b', cursor:'pointer'} }} onClick={onClick}>
            {value}
        </Typography>
    )
};

export default CategoryEditButton;
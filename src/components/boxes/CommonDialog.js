import {Button,Dialog,DialogActions,DialogContent,DialogContentText} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../atoms/alert';
import { useCallback } from 'react';

const CommonDialog = () => {
  const [dialogInfo, setDialogInfo] = useRecoilState(dialogState);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = useCallback(() => {
    setDialogInfo({state:false});
  },[setDialogInfo]);

  return (
      <Dialog
        fullScreen={fullScreen}
        open={dialogInfo.state??false}
        onClose={handleClose}
        sx={{maxwidth:'600px', p:10}}
      >
        <DialogContent>
          <DialogContentText>
            {dialogInfo.message }
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent:'space-evenly'}}>
            <Button sx={{backgroundColor:'#757575', color: '#d7dadc', '&:hover':{cursor:'pointer', backgroundColor:'#272729'}}} onClick={handleClose} >
              아니오
            </Button>
            <Button sx={{backgroundColor:'#757575', color: '#d7dadc', '&:hover':{cursor:'pointer', backgroundColor:'#272729'}}} onClick={dialogInfo.event}  >
              예
            </Button>
        </DialogActions>
      </Dialog>
  );
}

export default CommonDialog;
import { useCallback } from 'react';
import { Alert, Snackbar } from '@material-ui/core';
import { alertState } from '../../atoms/alert';
import { useRecoilState } from 'recoil';

const CommonAlert = () => {
  const [alertInfo, setAlert] = useRecoilState(alertState);

  const closeAlert = useCallback(() => {
    setAlert({
      state: false,
      message: '',
      severity: 'error'
    });
  }, [setAlert]);

  return (
    <Snackbar open={alertInfo.state} autoHideDuration={2000} onClose={closeAlert}>
      <Alert
        sx={{
          bottom: 0,
          minWidth: '340px',
          width: '50%',
          margin: '0 auto',
          marginBottom: '15px',
          py: 3,
          fontSize: '1.2em'
        }}
        onClose={closeAlert}
        severity={alertInfo.severity}
      >
        {alertInfo.message}
      </Alert>
    </Snackbar>
  );
};

export default CommonAlert;

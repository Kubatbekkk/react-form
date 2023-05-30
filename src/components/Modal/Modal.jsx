import { Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './style.css';

const Modal = (props) => {
  const { open, handleClose, userInfo: info } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">User Information</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <DialogContentText
          component="span"
          display="flex"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1">Name: </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {info.name}
          </Typography>
        </DialogContentText>

        <DialogContentText
          component="span"
          display="flex"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1">Password: </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {info.password}
          </Typography>
        </DialogContentText>

        <DialogContentText
          component="span"
          display="flex"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1">Email: </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {info.email}
          </Typography>
        </DialogContentText>

        <DialogContentText
          component="span"
          display="flex"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1">Birth City: </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {info.birthCity}
          </Typography>
        </DialogContentText>

        <DialogContentText
          component="span"
          display="flex"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1">Terms accepted: </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {info.acceptTerms ? 'yes' : 'no'}
          </Typography>
        </DialogContentText>

        <DialogContentText
          component="span"
          display="flex"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1">Message: </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {info.message}
          </Typography>
        </DialogContentText>

        <DialogContentText
          component="span"
          display="flex"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1">Gender: </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {info.gender}
          </Typography>
        </DialogContentText>

        <DialogContentText
          component="span"
          display="flex"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1">Date Of Flight: </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {info.dateOfFlight?.toString()}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Modal;

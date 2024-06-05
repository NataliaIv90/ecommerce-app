import { handleMouseDown } from '../../../helpers/handleMouseDown';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal } from '@mui/material';
import { Filters } from './Filters';

const style = {
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  bgcolor: '#f6f3f7',
  boxShadow: 24,
  p: 4,
  display: 'block',
  borderRadius: '10px',
};

export const FilterModalWindow: React.FC<{
  open: false | true;
  setOpen: React.Dispatch<React.SetStateAction<false | true>>;
}> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ overflow: 'scroll' }}
    >
      <Box sx={style}>
        <Filters />
        <Button
          sx={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            position: 'absolute',
            top: '20px',
            right: '20px',
          }}
          onMouseDown={handleMouseDown}
          onClick={handleClose}
        >
          <CloseIcon sx={{ width: '100%', height: '100%' }}></CloseIcon>
        </Button>
      </Box>
    </Modal>
  );
};

import { Box } from '@mui/material';
import { SortBar } from './Sort';

export const Toolbar: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <SortBar />
    </Box>
  );
};

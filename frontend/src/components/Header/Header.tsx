import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Properties = {
  onModalOpen: (value: boolean) => void;
}

const Header: React.FC<Properties> = ({ onModalOpen }) => {
  return (
      <AppBar position="static" sx={{ width: "100%", backgroundColor: "transparent" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000' }}>
            Inspectors
          </Typography>

          <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => onModalOpen(true)}
          >
            Add Inspector
          </Button>
        </Toolbar>
      </AppBar>
  );
}

export default Header;
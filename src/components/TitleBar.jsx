import { 
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Stack
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import UserInfo from './UserInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Title bar component
 */
export default function TitleBar () {

  /**
   * Utils
   */
  const {t} = useTranslation();
  const navigate = useNavigate();

  /**
   * States
   */
  const [currentPage, setCurrentPage] = useState('');

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack spacing={2} direction='row'>
          <Typography variant="h6" noWrap component="div">
            {t('spyglass')} {import.meta.env.VITE_APP_TITLE_SUFFIX}
          </Typography>

          <MenuItem onClick={() => navigate('/goals')}>
            <Typography textAlign="center">Active Goals</Typography>
          </MenuItem>

          <MenuItem onClick={() => navigate('/goals/completed')}>
            <Typography textAlign="center">Completed Goals</Typography>
          </MenuItem>
        </Stack>

        <UserInfo />
      </Toolbar>
    </AppBar>
  )
}
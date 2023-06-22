import { 
  AppBar,
  Toolbar,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import UserInfo from './UserInfo';

/**
 * Title bar component
 */
export default function TitleBar () {

  /**
   * Utils
   */
  const {t} = useTranslation();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          {t('spyglass')}
        </Typography>
        <UserInfo />
      </Toolbar>
    </AppBar>
  )
}
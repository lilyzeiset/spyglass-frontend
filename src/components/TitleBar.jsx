import { 
  AppBar,
  Toolbar,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * Title bar component
 */
export default function TitleBar () {

  const {t} = useTranslation();

  return (
    <AppBar
      position="fixed"
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {t('spyglass')}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
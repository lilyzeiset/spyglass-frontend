import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Collapse,
  List,
  Divider
} from '@mui/material';
import { 
  Logout,
  Translate,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFindUserInfoQuery, useLogoutMutation } from '../api/userApi';

export default function UserInfo() {

  /**
   * Utils
   */
  const {t, i18n} = useTranslation();
  const navigate = useNavigate();

  /**
   * States
   */
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [i18nMenuOpen, setI18nMenuOpen] = useState(false);

  /**
   * API Calls
   */
  const {
    data: userinfo,
    isError,
    isFetching
  } = useFindUserInfoQuery();

  const [logout] = useLogoutMutation();

  /**
   * Handles logging out
   */
  function handleLogout() {
    logout()
    .unwrap()
    .then(() => {
      navigate('/');
      window.location.reload();
    })
  }

  /**
   * Handles changing language
   */
  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  /**
   * Display nothing if not logged in
   */
  if (isError || isFetching) {
    return null;
  }

  /**
   * User menu
   */
  return (
    <>
      <IconButton onClick={event => setMenuAnchor(event.currentTarget)}>
        <Avatar alt={userinfo?.name} src={userinfo?.picture} />
      </IconButton>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <List disablePadding>
          <ListItem>
            <ListItemAvatar >
              <Avatar alt={userinfo?.name} src={userinfo?.picture} />
            </ListItemAvatar>
            <ListItemText primary={userinfo?.name} secondary={userinfo?.email} />
          </ListItem>

          <Divider />

          <ListItemButton onClick={() => setI18nMenuOpen(!i18nMenuOpen)}>
            <ListItemIcon sx={{pl: '0.5em'}}>
              <Translate />
            </ListItemIcon>
            <ListItemText primary={t('language')} />
            {i18nMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        
          <Collapse in={i18nMenuOpen} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemButton onClick={() => changeLanguage('en')}>
                <ListItemText inset primary="English" />
              </ListItemButton>
              <ListItemButton onClick={() => changeLanguage('de')}>
                <ListItemText inset primary="Deutsch" />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider />

          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{pl: '0.5em'}}>
              <Logout />
            </ListItemIcon>
            <ListItemText>
              {t('logout')}
            </ListItemText>
          </ListItemButton>

        </List>
      </Menu>

    </>
  )
}
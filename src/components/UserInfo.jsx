import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { useFindUserInfoQuery } from '../api/userApi';

export default function UserInfo() {

  /**
   * Utils
   */
  const {t, i18n} = useTranslation();

  /**
   * States
   */
  const [menuAnchor, setMenuAnchor] = useState(null);

  /**
   * API Call
   */
  const {
    data: userinfo,
    isError
  } = useFindUserInfoQuery();

  /**
   * Handles displaying menu
   */
  function handleShowMenu(event) {
    setMenuAnchor(event?.currentTarget);
  }

  /**
   * Handles closing menu
   */
  function handleCloseMenu() {
    setMenuAnchor(null);
  };

  /**
   * Handles logging out
   */
  function handleLogout() {

  }

  /**
   * Display nothing if not logged in
   */
  if (isError) {
    return null;
  }

  /**
   * User menu
   */
  return (
    <>
      <IconButton onClick={handleShowMenu}>
        <Avatar alt={userinfo?.name} src={userinfo?.picture} />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem divider>
{/*
          <Stack direction='row' spacing={2}>
            <Avatar alt={userinfo?.name} src={userinfo?.picture} sx={{width: '3em', height: '3em'}}/>
            <Stack>
              <Typography sx={{fontWeight: 'bold'}}>
                {userinfo?.name}
              </Typography>
              <Typography>
                {userinfo?.email}
              </Typography>
            </Stack>
          </Stack>
*/}
          <ListItemAvatar >
            <Avatar alt={userinfo?.name} src={userinfo?.picture} />
          </ListItemAvatar>
          <ListItemText primary={userinfo?.name} secondary={userinfo?.email} />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>
            {t('logout')}
          </ListItemText>
        </MenuItem>
      </Menu>

    </>
  )
}
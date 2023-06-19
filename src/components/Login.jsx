import { 
  Stack,
  TextField,
  Button,
  Typography
} from "@mui/material"
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Login() {

  /**
   * Utils
   */
  const {t} = useTranslation();

  /**
   * States
   */
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  /**
   * Handles logging in
   */
  function handleLogin() {
    console.log({email: inputEmail, password: inputPassword});
    /*
    auth({email: inputEmail, password: inputPassword})
    .unwrap()
    .then((res) => {
      setErrorMsg('');
      setUser(res);
      navigate('/');
    })
    .catch((_error) => {
      setErrorMsg(String(t('login-error')));
    })
    */
  }
  
  return (
    <Stack spacing={2} sx={{maxWidth: 480}}>
      <TextField 
        label={t('email')} 
        value={inputEmail} 
        onChange={e => setInputEmail(e.target.value)} 
      />
      <TextField 
        label={t('password')} 
        type='password'
        value={inputPassword} 
        onChange={e => setInputPassword(e.target.value)} 
      />
      <Button
        variant='contained'
        onClick={handleLogin}
      >
        {t('login')}
      </Button>
      <Typography color={'red'}>
        {errorMsg}
      </Typography>
    </Stack>
  )
}
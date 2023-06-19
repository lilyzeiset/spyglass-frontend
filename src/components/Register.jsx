import { 
  Stack,
  TextField,
  Button,
  Typography
} from "@mui/material"
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Register() {
  
  /**
   * Utils
   */
  const {t} = useTranslation();

  /**
   * States
   */
  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  /**
   * Handles creating a user
   */
  function handleRegister() {
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
        label={t('name')}
        value={inputName} 
        onChange={e => setInputName(e.target.value)} 
      />
      <TextField 
        label={t('email')}
        value={inputEmail} 
        onChange={e => setInputEmail(e.target.value)} 
      />
      <TextField 
        type='password'
        label={t('password')}
        value={inputPassword} 
        onChange={e => setInputPassword(e.target.value)} 
      />
      <TextField 
        type='password'
        label={t('confirm-password')}
        value={inputConfirmPassword} 
        onChange={e => setInputConfirmPassword(e.target.value)} 
      />
      <Button
        variant='contained'
        onClick={handleRegister}
      >
        {t('register')}
      </Button>
      <Typography color={'red'}>
        {errorMsg}
      </Typography>
    </Stack>
  )
}
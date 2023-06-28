import { 
  Button,
  Typography 
} from "@mui/material";
import { useFindUserInfoQuery } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Home() {

  /**
   * API Call / utils
   */
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {
    data: userinfo,
    isError,
    isLoading
  } = useFindUserInfoQuery();

  useEffect(() => {
    if (!isLoading && !isError) {
      navigate('/goals');
    }
  }, [userinfo])

  return (
    <Button onClick={() => {window.location.href(`${import.meta.env.VITE_API_URI}/signin`)}}>
      {t('login-google')}
    </Button>
    )
}
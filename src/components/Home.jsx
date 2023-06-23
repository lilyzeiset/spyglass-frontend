import { 
  Button,
  Typography 
} from "@mui/material";

export default function Home() {

  //get userinfo here, iferror, display login , else, redirect to goals

  return (
    <Button onClick={() => {window.location.replace(`${import.meta.env.VITE_API_URI}/signin`)}}>
      Log in with Google
    </Button>
  )
}
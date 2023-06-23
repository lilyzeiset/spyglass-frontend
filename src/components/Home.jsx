import { 
  Button,
  Typography 
} from "@mui/material";

export default function Home() {
  return (
    <Button onClick={() => {window.location.replace(`${import.meta.env.VITE_API_URI}/signin`)}}>
      Log in with Google
    </Button>
  )
}
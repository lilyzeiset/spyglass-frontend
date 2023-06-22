import { 
  Button,
  Typography 
} from "@mui/material";

export default function Home() {
  return (
    <Button onClick={() => {window.location.replace('http://localhost:8080/signin')}}>
      Log in with Google
    </Button>
  )
}
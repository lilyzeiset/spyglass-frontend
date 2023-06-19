import { 
  Typography,
  Stack,
  Card,
  TextField,
  Button,
  Box,
  CircularProgress
} from "@mui/material";

export default function Goal({goal}) {

  const progress = goal.currentAmount / goal.targetAmount * 100;

  return (
    <Card raised={true}>
      <Stack 
        spacing={2} 
        padding={2} 
        direction={'row'} 
        sx={{justifyContent: 'space-between'}}
      >
        <Box>
          <img src={'../vite.svg'} />
        </Box>

        <Stack spacing={2}>
          <Typography variant='h6' sx={{fontWeight: 'bold'}}>
            {goal.name}
          </Typography>
          <Typography>
            {goal.description}
          </Typography>
          <Typography>
            ${goal.currentAmount} / ${goal.targetAmount}
          </Typography>
          <Typography>
            Deposit 
            ${goal.depositAmount}
            every
            &nbsp;{goal.depositFrequency}
            to reach your goal by
            {goal.targetDate}.
          </Typography>
        </Stack>

        <Box>
          <CircularProgress variant="determinate" value={progress} />
        </Box>
      </Stack>
    </Card>
  )
}
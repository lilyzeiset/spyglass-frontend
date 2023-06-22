import { 
  Typography,
  Stack,
  Card,
  TextField,
  Button,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Goal({goal}) {

  const progress = goal.currentAmount / goal.targetAmount * 100;

  /**
   * Utils
   */
  const {t} = useTranslation();

  /**
   * States
   */
  const [frequency, setFrequency] = useState('day');
  const [depositAmount, setDepositAmount] = useState(0);

  /**
   * Calculate suggested deposit amount on component load
   */
  useEffect(() => {
    handleChangeFrequency(frequency);
  }, [])

  /**
   * Handles calculating suggested deposit amount
   * when changing frequency (day/week/month)
   */
  function handleChangeFrequency(freq) {
    setFrequency(freq);
    const days = Math.round((new Date(goal?.targetDate) - new Date())/(24*60*60*1000));
    switch(frequency) {
      case 'day':
        setDepositAmount((goal?.targetAmount / days).toFixed(2));
        break;
      case 'week':
        setDepositAmount((goal?.targetAmount / days / 7).toFixed(2));
        break;
      case 'month':
        setDepositAmount((goal?.targetAmount / days / 30).toFixed(2));
        break;
    }
  }

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
            {t('deposit')} ${depositAmount} {t('every')}&nbsp;
            <Select required
              variant="standard"
              id='frequency-select'
              label={t('frequency')}
              value={frequency}
              onChange={(event) => handleChangeFrequency(event.target.value)}
            >
              <MenuItem value='day'>
                {t('day')}
              </MenuItem>
              <MenuItem value='week'>
                {t('week')}
              </MenuItem>
              <MenuItem value='month'>
                {t('month')}
              </MenuItem>
            </Select>
            {t('reach-goal-by')}&nbsp;
            {new Date(goal.targetDate).toLocaleDateString()}.
          </Typography>

          <Button>
            {t('make-deposit')}
          </Button>
        </Stack>

        <Box>
          <CircularProgress variant="determinate" value={progress} />
        </Box>
      </Stack>
    </Card>
  )
}
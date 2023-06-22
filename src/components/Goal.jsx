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
  InputLabel,
  InputAdornment
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useUpdateGoalMutation, useDeleteGoalMutation } from "../api/goalApi";

export default function Goal({goal, refetchGoals}) {

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

  const [isEdit, setIsEdit] = useState(false);
  const [inputGoalName, setInputGoalName] = useState(goal?.name);
  const [inputGoalDescription, setInputGoalDescription] = useState(goal?.description);
  const [inputTargetAmount, setInputTargetAmount] = useState(goal?.targetAmount);
  const [inputTargetDate, setInputTargetDate] = useState(goal?.targetDate);

  /**
   * API Calls
   */
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();

  /**
   * Functions for handling editing
   */
  function handleSubmitEdit() {
    setIsEdit(false);
    updateGoal({
      ...goal,
      name: inputGoalName,
      description: inputGoalDescription,
      targetAmount: inputTargetAmount,
      targetDate: inputTargetDate
    })
    .unwrap()
    .then(() => {
      refetchGoals();
    });
  }

  function handleCancelEdit() {
    setInputGoalName(goal?.name);
    setInputGoalDescription(goal?.description);
    setInputTargetAmount(goal?.targetAmount);
    setInputTargetDate(goal?.targetDate);
    setIsEdit(false);
  }

  function handleDelete() {

  }

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
    switch(freq) {
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
        {/* Image display */}
        <Box>
          <img src={'../vite.svg'} />
        </Box>

        {/* Info (editing) */}
        {isEdit ? (
          <Stack spacing={2}>
            <TextField
              label={t('goal-name')}
              variant='standard'
              value={inputGoalName}
              onChange={e => setInputGoalName(e.target.value)}
            />
            <TextField
              label={t('goal-description')}
              variant='standard'
              value={inputGoalDescription}
              onChange={e => setInputGoalDescription(e.target.value)}
            />
            <TextField
              label={t('goal-target-amount')}
              variant='standard'
              type='number'
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              value={inputTargetAmount}
              onChange={e => setInputTargetAmount(e.target.value)}
            />
            <TextField
              label={t('goal-target-date')}
              variant='standard'
              value={inputTargetDate}
              onChange={e => setInputTargetDate(e.target.value)}
            />
            <Stack spacing={2} direction={'row'}>
              <Button
                variant='contained'
                onClick={handleSubmitEdit}
              >
                {t('submit')}
              </Button>
              <Button
                variant='contained'
                onClick={handleCancelEdit}
              >
                {t('cancel')}
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleDelete}
              >
                {t('delete')}
              </Button>
            </Stack>
          </Stack>
        ) : ( // Info (not editing)
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

            <Stack spacing={2} direction={'row'}>
              <Button variant='outlined' sx={{flexGrow: 1}}>
                {t('make-deposit')}
              </Button>
              <Button variant='outlined' onClick={() => setIsEdit(true)}>
                <EditIcon />
              </Button>
            </Stack>
          </Stack>
        )}

        {/* Progress Gauge */}
        <Box>
          <CircularProgress variant="determinate" value={progress} />
        </Box>
      </Stack>
    </Card>
  )
}
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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import SavingsIcon from '@mui/icons-material/Savings';
import ClearIcon from '@mui/icons-material/Clear';
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
  const [suggestedDepositAmount, setSuggestedDepositAmount] = useState(0);

  const [isEdit, setIsEdit] = useState(false);
  const [inputGoalName, setInputGoalName] = useState(goal?.name);
  const [inputGoalDescription, setInputGoalDescription] = useState(goal?.description);
  const [inputTargetAmount, setInputTargetAmount] = useState(goal?.targetAmount);
  const [inputTargetDate, setInputTargetDate] = useState(dayjs(new Date(goal?.targetDate)));

  const [isDeposit, setIsDeposit] = useState(false);
  const [inputDepositAmount, setInputDepositAmount] = useState(suggestedDepositAmount);

  /**
   * API Calls
   */
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();

  
  /**
   * Handles submitting a deposit
   */
  function handleMakeDeposit() {
    if (Number(inputDepositAmount) > 0) {
      setIsDeposit(false);
      const newCurrentAmount = Number(goal.currentAmount) + Number(inputDepositAmount)
      updateGoal({
        ...goal,
        currentAmount: newCurrentAmount
      })
      .unwrap()
      .then(() => {
        refetchGoals();
      });
    }
  }

  /**
   * Handles submitting an edit
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
      //update values on frontend rather than refetch
    });
  }

  /**
   * Handles cancelling an edit
   */
  function handleCancelEdit() {
    setInputGoalName(goal?.name);
    setInputGoalDescription(goal?.description);
    setInputTargetAmount(goal?.targetAmount);
    setInputTargetDate(dayjs(new Date(goal?.targetDate)));
    setIsEdit(false);
  }

  /**
   * Handles deleting a goal
   */
  function handleDelete() {
    setIsEdit(false);
    deleteGoal(goal?.id)
    .unwrap()
    .then(() => {
      refetchGoals();
    })
  }

  /**
   * Handles calculating suggested deposit amount
   * when changing frequency (day/week/month)
   */
  function handleChangeFrequency(freq) {
    setFrequency(freq);
    const days = Math.round((new Date(goal?.targetDate) - new Date())/(24*60*60*1000));
    switch(freq) {
      case 'day':
        setSuggestedDepositAmount((goal?.targetAmount / days).toFixed(2));
        break;
      case 'week':
        setSuggestedDepositAmount((goal?.targetAmount / days / 7).toFixed(2));
        break;
      case 'month':
        setSuggestedDepositAmount((goal?.targetAmount / days / 30).toFixed(2));
        break;
    }
  }

  /**
   * Calculate suggested deposit amount on component load
   */
  useEffect(() => {
    handleChangeFrequency(frequency);
  }, [])

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

        {isEdit ? ( //Info (editing)
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
            <DatePicker
              label={t('goal-target-date')}
              variant='standard'
              value={inputTargetDate}
              onChange={date => setInputTargetDate(date)}
            />

            {/* Button row (editing) */}
            <Stack spacing={2} direction={'row'}>
              <Button
                variant='contained'
                onClick={handleSubmitEdit}
                sx={{flexGrow: 1}}
              >
                {t('submit')}
              </Button>
              <Button
                variant='outlined'
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
            {goal?.description && ( //Don't show description line if there is none
              <Typography>
                {goal.description}
              </Typography>
            )}
            <Typography>
              ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
            </Typography>

            <Typography component='div'>
              {t('deposit')} ${suggestedDepositAmount} {t('every')}&nbsp;
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

            {isDeposit ? ( //Button row (making deposit)
              <Stack spacing={2} direction={'row'}>
                <Button variant='outlined' onClick={() => setIsDeposit(false)}>
                  <ClearIcon />
                </Button>
                <TextField
                  variant='standard'
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={inputDepositAmount}
                  onChange={e => setInputDepositAmount(e.target.value)}
                  sx={{flexGrow: 1}}
                />
                <Button variant='contained' onClick={handleMakeDeposit}>
                  <SavingsIcon />
                </Button>
              </Stack>
            ) : ( //Button row (not making deposit)
              <Stack spacing={2} direction={'row'}>
                <Button 
                  variant='contained' 
                  onClick={() => {
                    setInputDepositAmount(suggestedDepositAmount);
                    setIsDeposit(true);
                  }} 
                  sx={{flexGrow: 1}}
                >
                  {t('make-deposit')}
                </Button>
                <Button variant='outlined' onClick={() => setIsEdit(true)}>
                  <EditIcon />
                </Button>
              </Stack>
            )}
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
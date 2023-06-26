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

import { 
  useFindGoalByIdQuery,
  useUpdateGoalMutation, 
  useDeleteGoalMutation 
} from "../api/goalApi";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

export default function ViewGoal({goal1, refetchGoals1}) {

  // const progress = goal.currentAmount / goal.targetAmount * 100;

  /**
   * Utils
   */
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * API Calls
   */
  const {
    data: goal,
    refetch: refetchGoal
  } = useFindGoalByIdQuery(location.pathname.split('/').pop());
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();

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
        refetchGoal();
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
      refetchGoal();
      /*
      goal.name = inputGoalName;
      goal.description = inputGoalDescription;
      goal.targetAmount = inputTargetAmount;
      goal.targetDate = inputTargetDate;
      */
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
      navigate(-1);
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
   * Calculate suggested deposit amount whenever goal is updated
   */
  useEffect(() => {
    handleChangeFrequency(frequency);
  }, [goal])

  return (
    <Box>
      <Box padding={2}>
        <Button 
          variant='contained' 
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          {t('back')}
        </Button>
      </Box>

      <Card raised={true}>
        <Stack 
          spacing={3} 
          padding={2} 
          direction={'row'} 
          sx={{justifyContent: 'space-between'}}
        >
          {/* Image display */}
          <Box sx={{width: '12em'}}>
            <img src={'../vite.svg'} width='100%' />
          </Box>

          {isEdit ? ( //Info (editing)
            <Stack spacing={2}>
              <TextField
                label={t('goal-name')}
                variant='standard'
                color='secondary'
                value={inputGoalName}
                onChange={e => setInputGoalName(e.target.value)}
              />
              <TextField
                label={t('goal-description')}
                variant='standard'
                color='secondary'
                value={inputGoalDescription}
                onChange={e => setInputGoalDescription(e.target.value)}
              />
              <TextField
                label={t('goal-target-amount')}
                variant='standard'
                color='secondary'
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
                color='secondary'
                disablePast
                value={inputTargetDate}
                onChange={date => setInputTargetDate(date)}
              />

              {/* Button row (editing) */}
              <Stack spacing={2} direction={'row'}>
                <Button
                  variant='contained'
                  color='error'
                  onClick={handleDelete}
                >
                  {t('delete')}
                </Button>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={handleCancelEdit}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleSubmitEdit}
                  sx={{flexGrow: 1}}
                >
                  {t('submit')}
                </Button>
              </Stack>
            </Stack>
          ) : ( // Info (not editing)
            <Stack spacing={2}>
              <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                {goal?.name}
              </Typography>
              {goal?.description && ( //Don't show description line if there is none
                <Typography>
                  {goal?.description}
                </Typography>
              )}
              <Typography>
                ${goal?.currentAmount.toFixed(2)} / ${goal?.targetAmount.toFixed(2)}
              </Typography>

              <Typography component='div'>
                {t('deposit')} ${suggestedDepositAmount} {t('every')}&nbsp;
                <Select required
                  variant="standard"
                  color='secondary'
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
                {new Date(goal?.targetDate).toLocaleDateString()}.
              </Typography>

              {isDeposit ? ( //Button row (making deposit)
                <Stack spacing={2} direction={'row'}>
                  <Button variant='outlined' color='secondary' onClick={() => setIsDeposit(false)}>
                    <ClearIcon />
                  </Button>
                  <TextField
                    variant='standard'
                    color='secondary'
                    type='number'
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    value={inputDepositAmount}
                    onChange={e => setInputDepositAmount(e.target.value)}
                    sx={{flexGrow: 1}}
                  />
                  <Button variant='contained' color='secondary' onClick={handleMakeDeposit}>
                    <SavingsIcon />
                  </Button>
                </Stack>
              ) : ( //Button row (not making deposit)
                <Stack spacing={2} direction={'row'}>
                  <Button 
                    variant='contained' 
                    color='secondary'
                    onClick={() => {
                      setInputDepositAmount(suggestedDepositAmount);
                      setIsDeposit(true);
                    }} 
                    sx={{flexGrow: 1}}
                  >
                    {t('make-deposit')}
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={() => setIsEdit(true)}>
                    <EditIcon />
                  </Button>
                </Stack>
              )}
              </Stack>
              
          )}

          {/* Progress Gauge 
          <Box>
            <CircularProgress variant="determinate" value={progress} />
          </Box>
                  */}
        </Stack>
      </Card>
    </Box>
  )
}
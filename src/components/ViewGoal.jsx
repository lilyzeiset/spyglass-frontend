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
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import { 
  useFindGoalByIdQuery,
  useUpdateGoalMutation, 
  useDeleteGoalMutation, 
  useUploadImageMutation
} from "../api/goalApi";

import GoalChart from "./GoalChart";

export default function ViewGoal() {

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
    refetch: refetchGoal,
    isLoading,
    isFetching
  } = useFindGoalByIdQuery(location.pathname.split('/').pop());
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();
  const [uploadImage] = useUploadImageMutation();

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

  const [imageData, setImageData] = useState();

  const [isDeposit, setIsDeposit] = useState(false);
  const [inputDepositAmount, setInputDepositAmount] = useState(suggestedDepositAmount);

  const [completedMessage, setCompletedMessage] = useState('');
  
  /**
   * Handles submitting a deposit
   */
  function handleMakeDeposit() {
    if (Number(inputDepositAmount) > 0) {
      setIsDeposit(false);
      let goalCompleted = false;
      const newCurrentAmount = Number(goal.currentAmount) + Number(inputDepositAmount)
      if(newCurrentAmount >= Number(goal.targetAmount)) {
        goalCompleted = true;
        setCompletedMessage(t('goal-completed'));
      }
      updateGoal({
        ...goal,
        currentAmount: newCurrentAmount
      })
      .unwrap()
      .then(() => {
        if (goalCompleted) {
          setTimeout(() => {
            navigate('/goals/completed');
          }, 1000);
        }
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
      if (imageData) {
        uploadImage({id: goal.id, image: imageData})
        .unwrap()
        .then(() => {
          refetchGoal();
        })
        .catch(e => {
          console.log(e.message);
          refetchGoal();
        })
      } else {
        refetchGoal();
      }
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
   * Handles showing the edit form
   */
  function handleShowEdit() {
    setInputGoalName(goal?.name);
    setInputGoalDescription(goal?.description);
    setInputTargetAmount(goal?.targetAmount);
    setInputTargetDate(dayjs(new Date(goal?.targetDate)));
    setIsEdit(true);
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
        setSuggestedDepositAmount((goal?.targetAmount / Math.ceil(days / 7)).toFixed(2));
        break;
      case 'month':
        setSuggestedDepositAmount((goal?.targetAmount / Math.ceil(days / 30)).toFixed(2));
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
    <Stack spacing={2}>
      <Stack padding={2} spacing={2} direction='row'>
        <Button 
          variant='contained' 
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          {t('back')}
        </Button>
        <Typography variant='h6'>
          {completedMessage}
        </Typography>
      </Stack>

      <Card raised={true}>
        <Stack 
          spacing={3} 
          padding={2} 
          direction={'row'} 
          sx={{justifyContent: 'space-between'}}
        >
          {/* Image display */}
          <Box sx={{width: '12em'}}>
            <img 
              src={`${import.meta.env.VITE_IMAGE_BUCKET_URL}/${goal?.imagePath ?? 'default.jpg'}?${Date.now()}`} 
              width='100%' 
            />
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

              <Button
                variant="outlined"
                component="label"
              >
                {t('upload-image')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {setImageData(e.target.files[0])}}
                  hidden
                />
              </Button>

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

              <Box sx={{flexGrow: 1}} /> {/* Just to fill the space */}

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
                  <Button variant='outlined' color='secondary' onClick={handleShowEdit}>
                    <EditIcon />
                  </Button>
                </Stack>
              )}
              </Stack>
              
          )}

        </Stack>

      {!isLoading && !isFetching && <GoalChart current={goal?.currentAmount} target={goal?.targetAmount} />}
    
      </Card>
    </Stack>
  )
}
import {
  Button,
  Stack,
  TextField,
  InputAdornment
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateGoalMutation } from '../api/goalApi';

export default function CreateGoal({refetchGoals}) {

  /**
   * Utils
   */
  const {t} = useTranslation();

  /**
   * States
   */
  const [isCreating, setIsCreating] = useState(false);
  const [inputGoalName, setInputGoalName] = useState('');
  const [inputGoalDescription, setInputGoalDescription] = useState('');
  const [inputTargetAmount, setInputTargetAmount] = useState(0);
  const [inputTargetDate, setInputTargetDate] = useState('2024-01-01');
  
  /**
   * API Call
   */
  const [createGoal] = useCreateGoalMutation();

  /**
   * Handles creating a goal
   */
  function handleSubmitCreate() {
    setIsCreating(false);
    createGoal({
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

  /**
   * Handles cancelling creating a goal
   */
  function handleCancelCreate() {
    setInputGoalName('');
    setInputGoalDescription('');
    setInputTargetAmount(0);
    setInputTargetDate('');
    setIsCreating(false);
  }

  /**
   * Just display button until they click it
   */
  if (!isCreating) {
    return (
      <Button variant='contained' onClick={() => setIsCreating(true)}>
        {t('create-new-goal')}
      </Button>
    )
  }

  /**
   * Goal creation form
   */
  return (
    <Stack spacing={2}>
      <TextField
        label={t('goal-name')}
        variant='outlined'
        value={inputGoalName}
        onChange={e => setInputGoalName(e.target.value)}
      />
      <TextField
        label={t('goal-description')}
        variant='outlined'
        value={inputGoalDescription}
        onChange={e => setInputGoalDescription(e.target.value)}
      />
      <TextField
        label={t('goal-target-amount')}
        variant='outlined'
        type='number'
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={inputTargetAmount}
        onChange={e => setInputTargetAmount(e.target.value)}
      />
      <TextField
        label={t('goal-target-date')}
        variant='outlined'
        value={inputTargetDate}
        onChange={e => setInputTargetDate(e.target.value)}
      />
      <Stack spacing={2} direction={'row'}>
        <Button
          variant='contained'
          onClick={handleSubmitCreate}
        >
          {t('create-goal')}
        </Button>
        <Button
          variant='contained'
          onClick={handleCancelCreate}
        >
          {t('cancel')}
        </Button>
      </Stack>
    </Stack>
  )
}
import {
  Button,
  Stack,
  TextField,
  InputAdornment,
  Box,
  Card
} from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useCreateGoalMutation, useUploadImageMutation } from '../api/goalApi';
import { ArrowBack } from '@mui/icons-material';

export default function CreateGoal() {

  /**
   * Utils
   */
  const {t} = useTranslation();
  const navigate = useNavigate();

  /**
   * States
   */
  const [inputGoalName, setInputGoalName] = useState('');
  const [inputGoalDescription, setInputGoalDescription] = useState('');
  const [inputTargetAmount, setInputTargetAmount] = useState(0);
  const [inputTargetDate, setInputTargetDate] = useState(dayjs(new Date()));

  const [imageData, setImageData] = useState();
  
  /**
   * API Calls
   */
  const [createGoal] = useCreateGoalMutation();
  const [uploadImage] = useUploadImageMutation();

  /**
   * Handles creating a goal
   */
  function handleSubmitCreate() {
    createGoal({
      name: inputGoalName,
      description: inputGoalDescription,
      targetAmount: inputTargetAmount,
      targetDate: inputTargetDate
    })
    .unwrap()
    .then((goal) => {
      uploadImage({id: goal.id, image: imageData})
      .unwrap()
      .then(() => {
        navigate('/goals');
      })
      .catch(e => {
        console.log(e.message);
        navigate('/goals');
      })
    });
  }

  /**
   * Goal creation form
   */
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

      <Card raised>
        <Stack spacing={2} padding={2}>
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
          <Stack spacing={2} direction='row'>
            <TextField
              label={t('goal-target-amount')}
              variant='outlined'
              type='number'
              sx={{flexGrow: 1}}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              value={inputTargetAmount}
              onChange={e => setInputTargetAmount(e.target.value)}
            />
            <DatePicker
              label={t('goal-target-date')}
              variant='outlined'
              value={inputTargetDate}
              onChange={date => setInputTargetDate(date)}
            />
          </Stack>

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

          <Button
            variant='contained'
            color='secondary'
            sx={{flexGrow: 1}}
            onClick={handleSubmitCreate}
          >
            {t('create-goal')}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
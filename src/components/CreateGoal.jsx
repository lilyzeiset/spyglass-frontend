import {
  Button,
  Stack,
  TextField,
  InputAdornment,
  Box,
  Card,
  Typography
} from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
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
  const [inputTargetDate, setInputTargetDate] = useState(dayjs.utc(new Date()));

  const [imageData, setImageData] = useState();

  const [errorMsg, setErrorMsg] = useState('');
  
  /**
   * API Calls
   */
  const [createGoal] = useCreateGoalMutation();
  const [uploadImage] = useUploadImageMutation();

  /**
   * Handles creating a goal
   */
  function handleSubmitCreate() {
    const actualDate = inputTargetDate.add(12, 'hours').toDate(); //not ideal, dates are confusing
    createGoal({
      name: inputGoalName,
      description: inputGoalDescription,
      targetAmount: inputTargetAmount,
      targetDate: actualDate
    })
    .unwrap()
    .then((goal) => {
      if (imageData) {
        uploadImage({id: goal.id, image: imageData})
        .unwrap()
        .then(() => {
          navigate('/goals');
        })
        .catch(e => {
          console.log(e.message);
          navigate('/goals');
        })
      } else {
        navigate('/goals');
      }
    })
    .catch(() => {
      setErrorMsg(t('required-fields'));
    })
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
              disablePast
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
          {imageData?.name ?? ''}

          <Button
            variant='contained'
            color='secondary'
            sx={{flexGrow: 1}}
            onClick={handleSubmitCreate}
          >
            {t('create-goal')}
          </Button>
          <Typography color='error'>
            {errorMsg}
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}
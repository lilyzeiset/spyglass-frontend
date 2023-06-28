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

export default function ViewCompletedGoal({goal1, refetchGoals1}) {

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
    data: goal
  } = useFindGoalByIdQuery(location.pathname.split('/').pop());


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
            <img 
              src={`${import.meta.env.VITE_IMAGE_BUCKET_URL}/${goal?.imagePath ?? 'default.jpg'}?${Date.now()}`} 
              width='100%' 
            />
          </Box>

          
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

              </Stack>
              

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
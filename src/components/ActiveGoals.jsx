import { 
  Stack, 
  Typography,
  Box,
  Grid,
  Button
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { useFindActiveGoalsQuery } from "../api/goalApi";
import { useFindUserInfoQuery } from "../api/userApi";

import GoalLarge from "./ViewGoal";
import CreateGoal from "./CreateGoal";
import GoalSmall from "./GoalSmall";
import { useEffect } from "react";

export default function Goals() {

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
    data: goals,
    refetch: refetchGoals,
    isError,
    isLoading
  } = useFindActiveGoalsQuery();

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
    refetchGoals();
  }, [location, isLoading])


  if (isLoading) {
    return null;
  }

  return (
    <Box sx={{flexGrow: 1, maxWidth: '1000px'}}>
      <Box padding={2}>
        <Button 
          variant='contained' 
          color='secondary'
          onClick={() => navigate('/goal/create')}
        >
          {t('create-new-goal')}
        </Button>
      </Box>

      <Grid container spacing={2} align='center'>
        {goals?.map((goal) => (
          <Grid item key={goal?.id} xs={12} sm={12} md={6} sx={{width: '16em', height: '12em'}}>
            <Link to={`/goal/${goal.id}`} style={{ textDecoration: 'none' }}>
              <GoalSmall key={goal?.id} goal={goal} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
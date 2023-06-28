import { 
  Stack, 
  Typography,
  Box,
  Grid,
  Button
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { useFindInactiveGoalsQuery } from "../api/goalApi";

import GoalSmall from "./GoalSmall";

export default function CompletedGoals() {
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
  } = useFindInactiveGoalsQuery();

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
    <Box>
      <Grid container spacing={2}>
        {goals?.map((goal) => (
          <Grid item key={goal?.id} xs={12} sm={12} md={6} sx={{width: '16em', height: '12em'}}>
            <Link to={`/goal/completed/${goal.id}`} style={{ textDecoration: 'none' }}>
              <GoalSmall key={goal?.id} goal={goal} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
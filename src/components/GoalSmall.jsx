import { Card, Typography, Stack, LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.background,
  },
}));

export default function GoalSmall({goal}) {

  const {t} = useTranslation();

  return (
    <Card raised sx={{width: '100%', height: '100%'}}>
      <Stack spacing={2} padding={2}>
        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
          {goal?.name}
        </Typography>
        <Typography>
          ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
        </Typography>
        <Typography>
          {t('due-date')}: {new Date(goal.targetDate).toLocaleDateString()}
        </Typography>
        <StyledLinearProgress 
          variant='determinate' 
          color='secondary'
          value={100 * goal.currentAmount.toFixed(2) / goal.targetAmount.toFixed(2)} 
        />
      </Stack>
    </Card>
  )
}
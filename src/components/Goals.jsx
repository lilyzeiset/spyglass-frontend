import { 
  Stack, 
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useFindGoalsQuery } from "../api/goalApi";
import { useFindUserInfoQuery } from "../api/userApi";

import Goal from "./Goal";
import CreateGoal from "./CreateGoal";

export default function Goals() {

  /**
   * Utils
   */
  const {t} = useTranslation();

  /**
   * API Calls
   */
  const {
    data: goals,
    refetch: refetchGoals,
    isError
  } = useFindGoalsQuery();


  if (isError) {
    window.location.replace('http://localhost:8080/signin');
    return null;
  }


  return (
    <Stack spacing={2} sx={{maxWidth: 480}}>
      <CreateGoal refetchGoals={refetchGoals} />

      {goals?.map((goal) => (
        <Goal key={goal?.id} goal={goal} refetchGoals={refetchGoals} />
      ))}
    </Stack>
  )
}
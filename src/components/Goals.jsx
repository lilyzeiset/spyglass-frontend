import { 
  Stack, 
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";

import Goal from "./Goal";

export default function Goals() {

  /**
   * Utils
   */
  const {t} = useTranslation();

  /**
   * API Call
   */
  // const {
  //   data: goals,
  //   refetch: refetchGoals
  // } = useFindGoalsByUserIdQuery(userid);
  const goals = [
    {
      "id": 1,
      "name": "my goal",
      "description": "a description of my goal",
      "imagePath": "/images/goal.png",
      "targetAmount": "1000.00",
      "currentAmount": "100.00",
      "targetDate": "2023-12-25",
      "depositAmount": "20",
      "depositFrequency": 'day'
    },
    {
      "id": 2,
      "name": "my 2nd goal",
      "description": "another description of my goal",
      "imagePath": "/images/goal2.png",
      "targetAmount": "123.45",
      "currentAmount": "50.00",
      "targetDate": "2023-12-31",
      "depositAmount": "50",
      "depositFrequency": 'month'
    }
  ]

  return (
    <Stack spacing={2} sx={{maxWidth: 480}}>
      {goals?.map((goal) => (
        <Goal key={goal?.id} goal={goal} />
      ))}
    </Stack>
  )
}
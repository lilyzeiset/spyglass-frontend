import { 
  Stack, 
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useFindGoalsQuery } from "../api/goalApi";
import { useFindUserInfoQuery } from "../api/userApi";

import Goal from "./Goal";

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
    isError: fetchGoalsError
  } = useFindGoalsQuery();

  const {
    data: userinfo,
    isError: fetchUserinfoError
  } = useFindUserInfoQuery();

  if (fetchUserInfoError || fetchGoalsError) {
    window.location.replace('http://localhost:8080/signin');
    return null;
  }

  const mockgoals = [
    {
      "id": 1,
      "name": "my goal",
      "description": "a description of my goal",
      "imagePath": "/images/goal.png",
      "targetAmount": "1000.00",
      "currentAmount": "100.00",
      "targetDate": "2023-12-25"
    },
    {
      "id": 2,
      "name": "my 2nd goal",
      "description": "another description of my goal",
      "imagePath": "/images/goal2.png",
      "targetAmount": "123.45",
      "currentAmount": "50.00",
      "targetDate": "2023-12-31"
    }
  ]

  return (
    <Stack spacing={2} sx={{maxWidth: 480}}>
      <Typography>
        {userinfo?.name}
      </Typography>
      <Typography>
        {userinfo?.email}
      </Typography>
      <Typography>
        {userinfo?.sub}
      </Typography>
      <img src={userinfo?.picture} width='100px' />
      {goals?.map((goal) => (
        <Goal key={goal?.id} goal={goal} />
      ))}
    </Stack>
  )
}
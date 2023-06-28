import { Card, Typography } from "@mui/material";
import Chart from 'chart.js/auto';
import { useRef, useEffect } from "react";
import { useTheme } from '@mui/material/styles'

export default function GoalChart({current, target}) {

  const chartRef = useRef(null);

  const theme = useTheme();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Data for the doughnut chart
    const data = {
      labels: ['Amount saved', 'Amount remaining'],
      datasets: [{
        data: [Number(current), Number(target) - Number(current)],
        backgroundColor: [theme.palette.info.main, theme.palette.grey.A100],
      }],
    };

    // Options for the doughnut chart
    const options = {
      responsive: true,
    };

    // Create the doughnut chart
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    });

    // Clean up the chart on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Card raised sx={{padding: 2}}>
      <canvas ref={chartRef} />
    </Card>
  )
}
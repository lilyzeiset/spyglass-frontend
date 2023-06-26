import { CssBaseline, Toolbar, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './utils/reduxstore'

import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n";

import TitleBar from './components/TitleBar';
import Home from './components/Home';
import ActiveGoals from './components/ActiveGoals';
import ViewGoal from './components/ViewGoal';
import CompletedGoals from './components/CompletedGoals'
import CreateGoal from './components/CreateGoal';
import ViewCompletedGoal from './components/ViewCompletedGoal';

function App() {

  /**
   * Theme object used by Material UI
   */
  const mdTheme = createTheme({
    palette: {
      primary: {
        main: '#90141f'
      },
      secondary: {
        main: '#228d99'
      },
      background: {
        default: '#ededf2'
      }
    }
  });

  return (
    <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={mdTheme}>
    <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <CssBaseline />
      <TitleBar />
      <Box
        component="main"
        sx={{ 
          display: 'flex',
          flexGrow: 1, 
          bgcolor: 'background.default', 
          p: 3,
          pt: 12,
          justifyContent: 'center'
        }}
      >
        {/* <Toolbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/goals' element={<ActiveGoals />} />
          <Route path='/goals/completed' element={<CompletedGoals />} />
          <Route path='/goal/create' element={<CreateGoal />} />
          <Route path='/goal/:id' element={<ViewGoal />} />
          <Route path='/goal/completed/:id' element={<ViewCompletedGoal />} />
        </Routes>
      </Box>
    </BrowserRouter>
    </I18nextProvider>
    </ThemeProvider>
    </LocalizationProvider>
    </Provider>
  )
}

export default App

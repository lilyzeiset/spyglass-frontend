import { CssBaseline, Toolbar, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './utils/reduxstore'

import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n";

import TitleBar from './components/TitleBar';
import Home from './components/Home';
import Goals from './components/Goals';

function App() {

  /**
   * Theme object used by Material UI
   */
  const mdTheme = createTheme({
    palette: {
      primary: {
        main: '#76c076'
      }
    }
  });

  return (
    <Provider store={store}>
    <ThemeProvider theme={mdTheme}>
    <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TitleBar />
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            bgcolor: 'background.default', 
            p: 3,
            justifyContent: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            alignItems: 'center'
          }}
        >
          <Toolbar /> {/* preserves space taken up by titlebar */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/goals' element={<Goals />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
    </I18nextProvider>
    </ThemeProvider>
    </Provider>
  )
}

export default App

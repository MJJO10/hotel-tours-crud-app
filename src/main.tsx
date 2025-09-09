
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const theme = createTheme({
  palette: { mode: 'light' },
  typography: {
    fontFamily: [
      'Noto Sans Thai', 'Prompt', 'Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'
    ].join(',')
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CssBaseline } from '@mui/material'
import AllProviders from '@ContextProviders/AllProviders.jsx'
import MainFrame from '@Main/MainFrame.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <AllProviders>
      <MainFrame />
    </AllProviders>
  </React.StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline } from '@mui/material'
import * as CP from './ContextProviders/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <CP.ResizingProvider>
      <CP.SharedVariablesProvider>
        <CP.BreakpointsProvider>

          <App />

        </CP.BreakpointsProvider>
      </CP.SharedVariablesProvider>
    </CP.ResizingProvider>
  </React.StrictMode>,
)
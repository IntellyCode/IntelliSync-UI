import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Main/App.jsx'
import './index.css'
import { CssBaseline } from '@mui/material'
import * as CP from './Main/ContextProviders';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <CP.ResizingProvider>
      <CP.SharedVariablesProvider>
          <App />
      </CP.SharedVariablesProvider>
    </CP.ResizingProvider>
  </React.StrictMode>,
)
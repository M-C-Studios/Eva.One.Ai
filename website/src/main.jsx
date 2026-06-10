import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import OfflineBanner from './components/OfflineBanner.jsx'
import UpdateNotifier from './components/UpdateNotifier.jsx'
import SelfHealingInit from './components/SelfHealingInit.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SelfHealingInit />
      <OfflineBanner />
      <UpdateNotifier />
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

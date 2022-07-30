import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
// import { worker } from './api/server'
import App from './App'
import store from './store'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  TODO: https://parceljs.org/languages/javascript/#service-workers
  // Start our mock API server
  // await worker.start({ onUnhandledRequest: 'bypass' })

  const AppWrapper = () => (
    <Provider store={store}>
      <App />
    </Provider>
  )

  const root = createRoot(document.getElementById('root'))
  root.render(<AppWrapper />)
}

start()

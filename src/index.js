import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

import { worker } from './api/server'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  ReactDOM.render(
    // Was originally React.StrictMode but I don't care about react-registry's error
    // as I plan to re-write it for my own needs for funsies
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>,
    document.getElementById('root')
  )
}

start()

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import {ReduxRouter, reduxReactRouter} from 'redux-router'
import {createHistory} from 'history'
import effects from 'redux-effects'
import fetch from 'redux-effects-fetch'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import routes from './route'
import root_saga from './saga'


document.addEventListener('DOMContentLoaded', () => {
  const sagaMiddleware = createSagaMiddleware()

  if (process.env.NODE_ENV != 'production') {
    const persistState = require('redux-devtools').persistState
    const DevTools = require('./devtool').default

    function getDebugSessionKey() {
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      return (matches && matches.length > 0) ? matches[1] : null
    }

    const store = compose(
      applyMiddleware(effects, fetch, sagaMiddleware),
      reduxReactRouter({routes, createHistory}),
      DevTools.instrument(),
      persistState(getDebugSessionKey())
    )(createStore)(reducer)

    sagaMiddleware.run(root_saga)

    ReactDOM.render(
      <Provider store={store} key='provider'>
        <ReduxRouter routes={routes}/>
      </Provider>,
      document.getElementById('react-content')
    )

    if (module.hot) {
      module.hot.accept('./route', () => {
        const next_routes = require('./route').default
        ReactDOM.render(
          <Provider store={store} key='provider'>
            <ReduxRouter routes={next_routes}/>
          </Provider>,
          document.getElementById('react-content')
        )
      })

      module.hot.accept('./reducer', () => {
        const next_reducer = require('./reducer').default
        store.replaceReducer(next_reducer)
      })
    }
  } else {
    const store = compose(
      applyMiddleware(effects, fetch, sagaMiddleware),
      reduxReactRouter({routes, createHistory})
    )(createStore)(reducer)

    sagaMiddleware.run(root_saga)

    ReactDOM.render(
      <Provider store={store} key='provider'>
        <ReduxRouter routes={routes}/>
      </Provider>,
      document.getElementById('react-content')
    )
  }
})

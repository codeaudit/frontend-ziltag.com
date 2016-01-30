import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import {ReduxRouter, reduxReactRouter} from 'redux-router'
import {createHistory} from 'history'
import effects from 'redux-effects'
import fetch from 'redux-effects-fetch'
import sagaMiddleware from 'redux-saga'

import reducer from './reducer'
import routes from './route'
import sagas from './saga'


document.addEventListener('DOMContentLoaded', () => {
  const store = compose(
    reduxReactRouter({createHistory}),
    applyMiddleware(effects, fetch, sagaMiddleware(...sagas))
  )(createStore)(reducer)

  ReactDOM.render(
    <Provider store={store} key='provider'>
      <ReduxRouter routes={routes}/>
    </Provider>,
    document.getElementById('react-content')
  )
})

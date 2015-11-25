import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import {ReduxRouter, routerStateReducer, reduxReactRouter} from 'redux-router'
import {createHistory} from 'history'
import effects from 'redux-effects'
import fetch from 'redux-effects-fetch'

import reducer from './reducer'
import routes from './route'


document.addEventListener('DOMContentLoaded', () => {
  const store = compose(
    reduxReactRouter({createHistory}),
    applyMiddleware(effects, fetch)
  )(createStore)(reducer)

  ReactDOM.render(
    <Provider store={store} key='provider'>
      <ReduxRouter routes={routes}/>
    </Provider>,
    document.getElementById('react-content')
  )
})

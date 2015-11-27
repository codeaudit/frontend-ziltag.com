import React, {Component} from 'react'
import {createAction} from 'redux-actions'

import Logo from '../Logo'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class BasePage extends Component {
  constructor(props) {
    super(props)
    this.activate_avatar_menu = createAction('ACTIVATE_AVATAR_MENU')
    this.deactivate_avatar_menu = createAction('DEACTIVATE_AVATAR_MENU')
  }

  render() {
    const {
      children,
      user_info,
      dispatch
    } = this.props

    const {
      avatar
    } = user_info

    return (
      <div
        className='ziltag-base-page'
        onClick={() => {
          dispatch(this.deactivate_avatar_menu())
        }}
      >
        <div className='ziltag-base-page__head'>
          <Logo/>
          <img
            className='ziltag-base-page__avatar'
            src={avatar && avatar.thumb}
            onClick={(e) => {
              dispatch(this.activate_avatar_menu())
              e.stopPropagation()
            }}
          />
        </div>
          {children}
      </div>
    )
  }
}

export default BasePage

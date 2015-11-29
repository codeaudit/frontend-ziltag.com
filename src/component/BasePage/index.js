import React, {Component} from 'react'

import Logo from '../Logo'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class BasePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      children,
      user_info,
      actors
    } = this.props

    const {
      avatar
    } = user_info

    return (
      <div
        className='ziltag-base-page'
        onClick={() => {
          actors.deactivate_avatar_menu()
        }}
      >
        <div className='ziltag-base-page__head'>
          <Logo/>
          <img
            className='ziltag-base-page__avatar'
            src={avatar && avatar.thumb}
            onClick={(e) => {
              actors.activate_avatar_menu()
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

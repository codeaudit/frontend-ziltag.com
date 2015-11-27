import React, {Component} from 'react'

import Logo from '../Logo'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class BasePage extends Component {
  render() {
    const {
      children,
      user_info
    } = this.props

    const {
      avatar
    } = user_info

    return (
      <div className='ziltag-base-page'>
        <div className='ziltag-base-page__head'>
          <Logo/>
          <img className='ziltag-base-page__avatar' src={avatar && avatar.thumb}/>
        </div>
          {children}
      </div>
    )
  }
}

export default BasePage

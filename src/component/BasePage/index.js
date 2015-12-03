import React, {Component} from 'react'

import Logo from '../Logo'
import AvatarMenu from '../AvatarMenu'
import ZiltagMap from '../ZiltagMap'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class BasePage extends Component {
  render() {
    const {
      children,
      current_user,
      avatar_menu,
      ziltag_map,
      activate_avatar_menu,
      deactivate_avatar_menu
    } = this.props

    const {
      avatar
    } = current_user

    return (
      <div
        className='ziltag-base-page'
        onClick={() => {
          deactivate_avatar_menu()
        }}
      >
        <div className='ziltag-base-page__head'>
          <Logo/>
          <img
            className='ziltag-base-page__avatar'
            src={avatar && avatar.thumb}
            onClick={(e) => {
              activate_avatar_menu()
              e.stopPropagation()
            }}
          />
        </div>
        <AvatarMenu activated={avatar_menu.activated}/>
        <ZiltagMap
          {...this.props}
        />
        <span className='ziltag-base-page__href'>
          From <a href={ziltag_map.href}>{ziltag_map.host}</a>
        </span>
        {children}
      </div>
    )
  }
}

export default BasePage

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
      deactivate_avatar_menu,
      deactivate_ziltag_input,
      current_user_logout
    } = this.props

    return (
      <div
        className='ziltag-base-page'
        onClick={() => {
          deactivate_avatar_menu()
          deactivate_ziltag_input()
        }}
      >
        <div className='ziltag-base-page__head'>
          <Logo/>
          <img
            style={{
              display: current_user.usr ? 'inline' : 'none'
            }}
            className='ziltag-base-page__avatar'
            src={current_user.usr && current_user.usr.avatar}
            onClick={(e) => {
              activate_avatar_menu()
              e.stopPropagation()
            }}
          />
        </div>
        <AvatarMenu logout={current_user_logout} activated={avatar_menu.activated}/>
        <div className='ziltag-base-page-main'>
          <div className='ziltag-base-page-main__col0'>
            <ZiltagMap
              {...this.props}
            />
            <span className='ziltag-base-page__href'>
              From <a href={ziltag_map.href} target='_blank'>{ziltag_map.host}</a>
            </span>
          </div>
          <div className='ziltag-base-page-main__col1'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default BasePage

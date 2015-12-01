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
  constructor(props) {
    super(props)
  }

  render() {
    const {
      children,
      user_info,
      avatar_menu,
      ziltag_map,
      activate_avatar_menu,
      deactivate_avatar_menu
    } = this.props

    const {
      avatar
    } = user_info

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
        <AvatarMenu activated={avatar_menu.avatar_menu_activated}/>
        <ZiltagMap data={ziltag_map}/>
        {children}
      </div>
    )
  }
}

export default BasePage

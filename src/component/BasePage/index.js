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
      deactivate_avatar_menu,
      get_ziltag,
      hover_on_ziltag,
      unhover_on_ziltag
    } = this.props

    const {
      avatar
    } = user_info

    const enhanced_ziltag_map = Object.assign({}, ziltag_map)
    if (ziltag_map.ziltags) {
      enhanced_ziltag_map.ziltags = enhanced_ziltag_map.ziltags.map(ziltag => {
        ziltag.link = `/ziltags/${ziltag.id}`
        return ziltag
      })
    }

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
        <ZiltagMap
          get_ziltag={get_ziltag}
          hover_on_ziltag={hover_on_ziltag}
          unhover_on_ziltag={unhover_on_ziltag}
          data={enhanced_ziltag_map}
        />
        {children}
      </div>
    )
  }
}

export default BasePage

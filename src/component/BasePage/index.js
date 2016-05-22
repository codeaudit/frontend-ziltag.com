import React, {Component} from 'react'
import classNames from 'classnames'

import Logo from '../Logo'
import Avatar from '../Avatar'
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
      window_event,
      client_state
    } = this.props

    const {
      is_mobile
    } = client_state

    try {
      if (document) {
        const total_right_screen_margin = 40
        const min_width = 300
        const breakpoint = min_width * 2 + total_right_screen_margin

        if (document.documentElement.clientWidth < breakpoint) {
          if (is_mobile) {
            var fitted_ziltag_map_width = (
              document.documentElement.clientWidth
            )
          } else {
            var fitted_ziltag_map_width = (
              document.documentElement.clientWidth -
              total_right_screen_margin
            )
          }
        } else {
          var fitted_ziltag_map_width = (
            document.documentElement.clientWidth / 2 -
            total_right_screen_margin
          )
        }

        ziltag_map.height = fitted_ziltag_map_width / ziltag_map.width * ziltag_map.height
        ziltag_map.width = fitted_ziltag_map_width
      }
    } catch (e) {}

    return (
      <div
        className={
          classNames('ziltag-base-page', {
            'ziltag-base-page--mobile': is_mobile
          })
        }
        onClick={() => {
          deactivate_avatar_menu()
          deactivate_ziltag_input()
        }}
      >
        <div style={{zIndex: 5}} className='ziltag-base-page__head'>
          <Logo/>
          {current_user.usr && <Avatar
            style={{
              display: current_user.usr && !is_mobile ? 'inline' : 'none'
            }}
            className='ziltag-base-page__avatar'
            src={current_user.usr.avatar}
            onClick={(e) => {
              activate_avatar_menu()
              e.stopPropagation()
            }}
          />}
        </div>
        {current_user.usr && <AvatarMenu
          {...this.props}
          {...avatar_menu}
        />}
        <div className='ziltag-base-page-main'>
          {ziltag_map.ziltags && <div className='ziltag-base-page-main__col0'>
            <ZiltagMap
              {...this.props}
              style={{
                width: ziltag_map.width,
                height: ziltag_map.height
              }}
            />
            <span className='ziltag-base-page__href'>
              From <a href={ziltag_map.href} target='_blank'>{ziltag_map.host}</a>
            </span>
          </div>}
          <div className='ziltag-base-page-main__col1'>
            {ziltag_map.ziltags && children}
          </div>
        </div>
      </div>
    )
  }
}

export default BasePage

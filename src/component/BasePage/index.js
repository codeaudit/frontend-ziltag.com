import React, {Component} from 'react'
import classNames from 'classnames'

import Logo from '../Logo'
import Avatar from '../Avatar'
import AvatarMenu from '../AvatarMenu'
import AuthForm from '../AuthForm'
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
      auth_form,
      ziltag_map,
      ziltags,
      activate_avatar_menu,
      activate_auth_form,
      deactivate_avatar_menu,
      deactivate_auth_form,
      deactivate_ziltag_input,
      deactivate_ziltag_reader,
      current_user_sign_in,
      current_user_join,
      forgot_password,
      auth_form_refresh,
      auth_form_change_mode,
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

        const fitted_ziltag_map_width = do {
          if (document.documentElement.clientWidth < breakpoint) {
            if (is_mobile) {
              document.documentElement.clientWidth
            } else {
              document.documentElement.clientWidth - total_right_screen_margin
            }
          } else {
            document.documentElement.clientWidth / 2 - total_right_screen_margin
          }
        }

        ziltag_map.height = fitted_ziltag_map_width / ziltag_map.width * ziltag_map.height || 0
        ziltag_map.width = fitted_ziltag_map_width
      }
    } catch (e) {}

    try {
      var is_iframe = window != window.parent
    } catch (e) {}

    const avatar_component = (
      <Avatar
        style={{
          display: current_user.usr && !is_mobile ? 'inline' : 'none'
        }}
        className='ziltag-base-page__avatar'
        src={current_user.usr && current_user.usr.avatar}
        onClick={e => {
          activate_avatar_menu()
          e.stopPropagation()
        }}
      />
    )

    const close_component = is_mobile && (
      <div
        style={{
          visibility: is_iframe ? 'visible' : 'hidden'
        }}
        className='ziltag-base-page__close--mobile'
        onClick={deactivate_ziltag_reader}
      />
    )

    const head_component = (
      <div style={{zIndex: 5}} className='ziltag-base-page__head'>
        <Logo/>
        {
          do {
            if (current_user.usr) {
              avatar_component
            } else if (!is_mobile && current_user.permissions) {
              <div
                className='ziltag-base-page__head-login'
                onClick={e => {
                  activate_auth_form()
                  e.stopPropagation()
                }}
              >
                Log in
              </div>
            }
          }
        }
        {close_component}
      </div>
    )

    const avatar_menu_component = current_user.usr && (
      <AvatarMenu
        {...this.props}
        {...avatar_menu}
      />
    )

    const auth_form_component = auth_form.activated && (
      <AuthForm
        className='ziltag-base-page__auth-form'
        handle_log_in={current_user_sign_in}
        handle_create_account={current_user_join}
        handle_forgot_password={forgot_password}
        handle_refresh={auth_form_refresh}
        handle_change_mode={auth_form_change_mode}
        mode={auth_form.mode}
        error={auth_form.error}
        onClick={e => {
          e.stopPropagation()
        }}
      />
    )

    return (
      <div
        className={
          classNames('ziltag-base-page', {
            'ziltag-base-page--mobile': is_mobile
          })
        }
        onClick={() => {
          deactivate_avatar_menu()
          deactivate_auth_form()
          deactivate_ziltag_input()
        }}
      >
        {head_component}
        {avatar_menu_component}
        {auth_form_component}
        <div className='ziltag-base-page-main'>
          {ziltag_map &&
            <div className='ziltag-base-page-main__col0'>
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
            {ziltags && children}
          </div>
        </div>
      </div>
    )
  }
}

export default BasePage

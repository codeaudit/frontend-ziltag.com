import {createAction} from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'

import {RAILS_ADDR} from '../env'


export const user_info_fetched = createAction('USER_INFO_FETCHED')

export function get_user_info() {
  const api = `${RAILS_ADDR}/api/v1/me`
  return bind(fetch(api, {
    credentials: 'include'
  }), user_info_fetched)
}

export const activate_avatar_menu = createAction('ACTIVATE_AVATAR_MENU')
export const deactivate_avatar_menu = createAction('DEACTIVATE_AVATAR_MENU')

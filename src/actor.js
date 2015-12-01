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

export const ziltag_map_fetched = createAction('ZILTAG_MAP_FETCHED')

export function get_ziltag_map(map_id) {
  const api = `${RAILS_ADDR}/api/v1/ziltag_maps/${map_id}`
  return bind(fetch(api, {
    credentials: 'include'
  }), ziltag_map_fetched)
}

export const ziltag_fetched = createAction('ZILTAG_FETCHED')

export function get_ziltag(ziltag_id) {
  const api = `${RAILS_ADDR}/api/v1/ziltags/${ziltag_id}`
  return bind(fetch(api, {
    credentials: 'include'
  }), ziltag_fetched)
}

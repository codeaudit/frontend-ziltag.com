import {createAction} from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'

import {RAILS_ADDR} from '../env'


export const current_user_fetched = createAction('CURRENT_USER_FETCHED')

export function fetch_current_user() {
  const api = `${RAILS_ADDR}/api/v1/me`
  return bind(fetch(api, {
    credentials: 'include'
  }), current_user_fetched)
}

export const activate_avatar_menu = createAction('ACTIVATE_AVATAR_MENU')
export const deactivate_avatar_menu = createAction('DEACTIVATE_AVATAR_MENU')

export const ziltag_map_fetched = createAction('ZILTAG_MAP_FETCHED')

export function fetch_ziltag_map(map_id) {
  const api = `${RAILS_ADDR}/api/v1/ziltag_maps/${map_id}`
  return bind(fetch(api, {
    credentials: 'include'
  }), ziltag_map_fetched)
}

export const ziltag_fetched = createAction('ZILTAG_FETCHED')

export function fetch_ziltag(ziltag_id) {
  const api = `${RAILS_ADDR}/api/v1/ziltags/${ziltag_id}`
  return bind(fetch(api, {
    credentials: 'include'
  }), ziltag_fetched)
}

export const hover_on_ziltag = createAction('HOVER_ON_ZILTAG')
export const unhover_on_ziltag = createAction('UNHOVER_ON_ZILTAG')

export const activate_ziltag_input = createAction('ACTIVATE_ZILTAG_INPUT')
export const deactivate_ziltag_input = createAction('DEACTIVATE_ZILTAG_INPUT')

export const ziltag_created = createAction('ZILTAG_CREATED')

export function create_ziltag(map_id, x, y, content) {
  const api = `${RAILS_ADDR}/api/v1/ziltags`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ziltag: {
        map_id, x, y, content
      }
    })
  }), ziltag_created)
}

export const ziltag_input_changed = createAction('ZILTAG_INPUT_CHANGED')

export const ziltag_input_sign_up = createAction('ZILTAG_INPUT_SIGN_UP')
export const ziltag_input_login = createAction('ZILTAG_INPUT_LOGIN')


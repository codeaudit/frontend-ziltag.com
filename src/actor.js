import {createAction} from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'

import {API_ADDR} from '../env'


export const current_user_fetched = createAction('CURRENT_USER_FETCHED')

export function fetch_current_user() {
  const api = `${API_ADDR}/api/v1/me`
  return bind(fetch(api, {
    credentials: 'include'
  }), current_user_fetched)
}

export const activate_avatar_menu = createAction('ACTIVATE_AVATAR_MENU')
export const deactivate_avatar_menu = createAction('DEACTIVATE_AVATAR_MENU')

export const ziltag_map_fetched = createAction('ZILTAG_MAP_FETCHED')

export function fetch_ziltag_map(map_id) {
  const api = `${API_ADDR}/api/v1/ziltag_maps/${map_id}`
  return bind(fetch(api, {
    credentials: 'include'
  }), ziltag_map_fetched)
}

export const ziltag_fetched = createAction('ZILTAG_FETCHED')

export function fetch_ziltag(ziltag_id) {
  const api = `${API_ADDR}/api/v1/ziltags/${ziltag_id}`
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
  const api = `${API_ADDR}/api/v1/ziltags`
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

export const activate_ziltag_edit_mode = createAction('ACTIVATE_ZILTAG_EDIT_MODE')
export const deactivate_ziltag_edit_mode = createAction('DEACTIVATE_ZILTAG_EDIT_MODE')

export const activate_ziltag_delete_mode = createAction('ACTIVATE_ZILTAG_DELETE_MODE')
export const deactivate_ziltag_delete_mode = createAction('DEACTIVATE_ZILTAG_DELETE_MODE')

export const ziltag_edited = createAction('ZILTAG_EDITED')
export const ziltag_deleted = createAction('ZILTAG_DELETED')

export function edit_ziltag(ziltag_id, content) {
  const api = `${API_ADDR}/api/v1/ziltags/${ziltag_id}`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ziltag: {
        content
      }
    })
  }), ziltag_edited)
}

export function delete_ziltag(ziltag_id) {
  const api = `${API_ADDR}/api/v1/ziltags/${ziltag_id}`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'delete'
  }), () => ziltag_deleted({id: ziltag_id}))
}

export const activate_ziltag_comment_edit_mode = createAction('ACTIVATE_ZILTAG_COMMENT_EDIT_MODE')
export const deactivate_ziltag_comment_edit_mode = createAction('DEACTIVATE_ZILTAG_COMMENT_EDIT_MODE')

export const activate_ziltag_comment_delete_mode = createAction('ACTIVATE_ZILTAG_COMMENT_DELETE_MODE')
export const deactivate_ziltag_comment_delete_mode = createAction('DEACTIVATE_ZILTAG_COMMENT_DELETE_MODE')

export const ziltag_comment_edited = createAction('ZILTAG_COMMENT_EDITED')
export const ziltag_comment_deleted = createAction('ZILTAG_COMMENT_DELETED')

export function edit_ziltag_comment(comment_id, content) {
  const api = `${API_ADDR}/api/v1/comments/${comment_id}`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: {
        content
      }
    })
  }), ziltag_comment_edited)
}

export function delete_ziltag_comment(comment_id) {
  const api = `${API_ADDR}/api/v1/comments/${comment_id}`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'delete'
  }), () => ziltag_comment_deleted(comment_id))
}

export const ziltag_input_changed = createAction('ZILTAG_INPUT_CHANGED')
export const ziltag_editor_changed = createAction('ZILTAG_EDITOR_CHANGED')
export const ziltag_comment_input_changed = createAction('ZILTAG_COMMENT_INPUT_CHANGED')
export const ziltag_comment_editor_changed = createAction('ZILTAG_COMMENT_EDITOR_CHANGED')

export const ziltag_comment_created = createAction('ZILTAG_COMMENT_CREATED')

export function create_ziltag_comment(ziltag_id, content) {
  const api = `${API_ADDR}/api/v1/comments`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: {
        ziltag_id, content
      }
    })
  }), ziltag_comment_created)
}

export const ziltag_input_sign_up = createAction('ZILTAG_INPUT_SIGN_UP')
export const ziltag_input_login = createAction('ZILTAG_INPUT_LOGIN')

export const current_user_logged_out = createAction('CURRENT_USER_LOGGED_OUT')

export function current_user_logout() {
  const api = `${API_ADDR}/api/v1/sign_out`
  return bind(fetch(api, {
    credentials: 'include'
  }), current_user_logged_out)
}

export const current_user_logged_in = createAction('CURRENT_USER_LOGGED_IN')
export const current_user_login_failed = createAction('CURRENT_USER_LOGIN_FAILED')

export function current_user_login(user, password) {
  const api = `${API_ADDR}/api/v1/sign_in`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        login: user,
        password
      }
    })
  }), (resp) => {
    if (resp.value.error == 'invalid login name or password') {
      return current_user_login_failed(resp)
    } else {
      return current_user_logged_in(resp)
    }
  })
}

export const current_user_signed_up = createAction('CURRENT_USER_SIGNED_UP')
export const current_user_sign_up_failed = createAction('CURRENT_USER_SIGN_UP_FAILED')

export function current_user_sign_up(name, email) {
  const api = `${API_ADDR}/api/v1/users`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: name,
        email
      }
    })
  }), current_user_signed_up, current_user_sign_up_failed)
}

export const login_form_user_changed = createAction('LOGIN_FORM_USER_CHANGED')
export const login_form_password_changed = createAction('LOGIN_FORM_PASSWORD_CHANGED')

export const sign_up_form_name_changed = createAction('SIGN_UP_FORM_NAME_CHANGED')
export const sign_up_form_email_changed = createAction('SIGN_UP_FORM_EMAIL_CHANGED')

export const activate_pseudo_comment = createAction('ACTIVATE_PSEUDO_COMMENT')
export const deactivate_pseudo_comment = createAction('DEACTIVATE_PSEUDO_COMMENT')

export const pseudo_comment_sign_up = createAction('PSEUDO_COMMENT_SIGN_UP')
export const pseudo_comment_login = createAction('PSEUDO_COMMENT_LOGIN')

export const verification_mail_resended = createAction('VERIFICATION_MAIL_RESENDED')

export function resend_verification_mail(params) {
  const api = `${API_ADDR}/api/v1/resend_confirmation`
  return bind(fetch(api, {
    credentials: 'include',
    method: 'post'
  }), () => verification_mail_resended(params))
}

export const sse_ziltag_created = createAction('SSE_ZILTAG_CREATED')
export const sse_ziltag_updated = createAction('SSE_ZILTAG_UPDATED')
export const sse_ziltag_deleted = createAction('SSE_ZILTAG_DELETED')
export const sse_comment_created = createAction('SSE_COMMENT_CREATED')
export const sse_comment_updated = createAction('SSE_COMMENT_UPDATED')
export const sse_comment_deleted = createAction('SSE_COMMENT_DELETED')

export const can_create_ziltag_page_stream = createAction('CAN_CREATE_ZILTAG_PAGE_STREAM')
export const can_create_ziltag_map_page_stream = createAction('CAN_CREATE_ZILTAG_MAP_PAGE_STREAM')

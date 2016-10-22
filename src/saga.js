import 'event-source-polyfill'

import {takeEvery} from 'redux-saga'
import {take, put, call, race, select} from 'redux-saga/effects'
import {push} from 'redux-router'
import MobileDetect from 'mobile-detect'

import {
  sse_ziltag_created,
  sse_ziltag_updated,
  sse_ziltag_deleted,
  sse_comment_created,
  sse_comment_updated,
  sse_comment_deleted,
  deactivate_avatar_menu,
  deactivate_social_media_menu,
  deactivate_ziltag_input,
  clean_ziltag_comment_input,
  window_resized,
  update_client_state,
  forgot_password_email_sent,
  forgot_password_email_not_found,
  fetch_current_user
} from './actor'


// TODO: fix the duplicated event listeners
function wait_for_event(elm, event_type) {
  return new Promise(resolve => {
    const cb = e => {
      resolve(e)
      elm.removeEventListener(event_type, cb)
    }
    elm.addEventListener(event_type, cb)
  })
}

function* set_ziltag_page_stream() {
  var ziltag_page_action = yield take('CAN_CREATE_ZILTAG_PAGE_STREAM')
  var ziltag_id = ziltag_page_action.payload.id
  var esrc = new EventSource(
    `/api/v1/ziltags/${ziltag_id}/stream`
  )

  while (true) {
    const {
      new_ziltag_page_action,
      ziltag_map_page_action,
      create_ziltag_resp,
      update_ziltag_resp,
      delete_ziltag_resp,
      create_comment_resp,
      update_comment_resp,
      delete_comment_resp
    } = yield race({
      new_ziltag_page_action: take('CAN_CREATE_ZILTAG_PAGE_STREAM'),
      ziltag_map_page_action: take('CAN_CREATE_ZILTAG_MAP_PAGE_STREAM'),
      create_ziltag_resp: call(wait_for_event, esrc, 'create_ziltag'),
      update_ziltag_resp: call(wait_for_event, esrc, 'update_ziltag'),
      delete_ziltag_resp: call(wait_for_event, esrc, 'delete_ziltag'),
      create_comment_resp: call(wait_for_event, esrc, 'create_comment'),
      update_comment_resp: call(wait_for_event, esrc, 'update_comment'),
      delete_comment_resp: call(wait_for_event, esrc, 'delete_comment')
    })

    if (new_ziltag_page_action) {
      esrc.close()
      ziltag_id = new_ziltag_page_action.payload.id
      esrc = new EventSource(
        `/api/v1/ziltags/${ziltag_id}/stream`
      )
    } else if (ziltag_map_page_action) {
      esrc.close()
    } else if (create_ziltag_resp) {
      yield put(sse_ziltag_created({value: JSON.parse(create_ziltag_resp.data)}))
    } else if (update_ziltag_resp) {
      yield put(sse_ziltag_updated({value: JSON.parse(update_ziltag_resp.data)}))
    } else if (delete_ziltag_resp) {
      esrc.close()
      yield put(sse_ziltag_deleted(JSON.parse(delete_ziltag_resp.data)))
    } else if (create_comment_resp) {
      yield put(sse_comment_created({value: JSON.parse(create_comment_resp.data)}))
    } else if (update_comment_resp) {
      yield put(sse_comment_updated({value: JSON.parse(update_comment_resp.data)}))
    } else if (delete_comment_resp) {
      yield put(sse_comment_deleted(JSON.parse(delete_comment_resp.data)))
    }
  }
}

function* set_ziltag_map_page_stream() {
  var ziltag_map_page_action = yield take('CAN_CREATE_ZILTAG_MAP_PAGE_STREAM')
  var ziltag_map_id = ziltag_map_page_action.payload.id
  var esrc = new EventSource(
    `/api/v1/ziltag_maps/${ziltag_map_id}/stream`
  )

  while (true) {
    const {
      ziltag_page_action,
      create_ziltag_resp,
      update_ziltag_resp,
      delete_ziltag_resp
    } = yield race({
      ziltag_page_action: take('CAN_CREATE_ZILTAG_PAGE_STREAM'),
      create_ziltag_resp: call(wait_for_event, esrc, 'create_ziltag'),
      update_ziltag_resp: call(wait_for_event, esrc, 'update_ziltag'),
      delete_ziltag_resp: call(wait_for_event, esrc, 'delete_ziltag')
    })

    if (ziltag_page_action) {
      esrc.close()
      ziltag_map_page_action = yield take('CAN_CREATE_ZILTAG_MAP_PAGE_STREAM')
      ziltag_map_id = ziltag_map_page_action.payload.id
      esrc = new EventSource(
        `/api/v1/ziltag_maps/${ziltag_map_id}/stream`
      )
    } else if (create_ziltag_resp) {
      yield put(sse_ziltag_created({value: JSON.parse(create_ziltag_resp.data)}))
    } else if (update_ziltag_resp) {
      yield put(sse_ziltag_updated({value: JSON.parse(update_ziltag_resp.data)}))
    } else if (delete_ziltag_resp) {
      yield put(sse_ziltag_deleted(JSON.parse(delete_ziltag_resp.data)))
    }
  }
}

function* deactivate_plugin_ziltag_reader() {
  while (true) {
    yield take('DEACTIVATE_ZILTAG_READER')
    window.parent.postMessage('deactivate_ziltag_reader', '*')
  }
}

function* listen_resize_event() {
  while (true) {
    yield call(wait_for_event, window, 'resize')
    yield put(window_resized())
  }
}

function* detect_mobile() {
  yield take('CAN_UPDATE_CLIENT_STATE')
  const is_mobile = yield call(() => !!new MobileDetect(window.navigator.userAgent).mobile())
  yield put(update_client_state({is_mobile}))
}

function* deactivate_previous_state() {
  yield put(deactivate_avatar_menu())
  yield put(deactivate_social_media_menu())
  yield put(deactivate_ziltag_input())
  yield put(clean_ziltag_comment_input())
}

function* listen_reader() {
  while (true) {
    var {data: action} = yield call(wait_for_event, window, 'message')

    if (action.type === 'LOAD_ZILTAG') {
      yield* deactivate_previous_state()
      yield put(push(`/ziltags/${action.payload.id}`))
    } else if (action.type === 'LOAD_ZILTAG_MAP') {
      yield* deactivate_previous_state()
      yield put(push(`/ziltag_maps/${action.payload.id}`))
    }
  }
}

function* listen_forgot_password() {
  yield takeEvery('FORGOT_PASSWORD', forgot_password)
}

function* forgot_password() {
  const email = yield select(state => state.forgot_password_form.email)
  const {success, errors} = yield call(() => fetch('/api/v2/password', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  }).then(resp => resp.json()))

  if (errors) {
    yield put(forgot_password_email_not_found({error: 'Email not found.'}))
  } else {
    yield put(forgot_password_email_sent({message: 'Password reset email has been sent.'}))
  }
}

function* dispatch_event() {
  while (true) {
    const {
      ziltag_input_activated
    } = yield race({
      ziltag_input_activated: take('ACTIVATE_ZILTAG_INPUT')
    })

    if (ziltag_input_activated) {
      var message = {
        type: 'event',
        payload: {type: 'ZILTAG_INPUT_ACTIVATED'}
      }
    }

    window.parent.postMessage(message, '*')
  }
}

function* post_sign_out() {
  while (true) {
    yield take('CURRENT_USER_SIGNED_OUT')
    const ziltag_map_id = yield select(state => state.current_ziltag_map_id)
    yield put(fetch_current_user({ziltag_map_id}))
  }
}

export default function* root_saga() {
  yield [
    set_ziltag_page_stream(),
    set_ziltag_map_page_stream(),
    deactivate_plugin_ziltag_reader(),
    listen_resize_event(),
    detect_mobile(),
    listen_reader(),
    listen_forgot_password(),
    dispatch_event(),
    post_sign_out()
  ]
}

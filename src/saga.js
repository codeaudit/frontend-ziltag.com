import 'event-source-polyfill'

import {take, put, call, race} from 'redux-saga/effects'
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
  update_client_state
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

export default function* root_saga() {
  yield [
    set_ziltag_page_stream(),
    set_ziltag_map_page_stream(),
    deactivate_plugin_ziltag_reader(),
    listen_resize_event(),
    detect_mobile(),
    listen_reader()
  ]
}

import {take, put, call, race} from 'redux-saga'

import {
  sse_ziltag_created,
  sse_ziltag_updated,
  sse_ziltag_deleted,
  sse_comment_created,
  sse_comment_updated,
  sse_comment_deleted
} from './actor'

import {SSE_ADDR} from '../env'

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
    `${SSE_ADDR}/api/v1/ziltags/${ziltag_id}/stream`
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
        `${SSE_ADDR}/api/v1/ziltags/${ziltag_id}/stream`
      )
    } else if (ziltag_map_page_action) {
      esrc.close()
      yield take('CAN_CREATE_ZILTAG_PAGE_STREAM')
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
    `${SSE_ADDR}/api/v1/ziltag_maps/${ziltag_map_id}/stream`
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
        `${SSE_ADDR}/api/v1/ziltag_maps/${ziltag_map_id}/stream`
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

export default [
  set_ziltag_page_stream,
  set_ziltag_map_page_stream
]

import {combineReducers} from 'redux'
import {routerStateReducer, push} from 'redux-router'


function current_user(state={}, action) {
  switch (action.type) {
    case 'CURRENT_USER_FETCHED':
    case 'CURRENT_USER_LOGGED_IN':
    case 'CURRENT_USER_JOINED':
      return {...action.payload.value, status: 'success'}
    case 'CURRENT_USER_LOGGED_OUT':
      return {}
    case 'CURRENT_USER_SIGN_IN_FAILED':
      return {status: 'sign_in_failed', prompt: 'Incorrect email or password.'}
    case 'CURRENT_USER_JOIN_FAILED':
      if (action.payload.value.errors.email[0] == 'is invalid') {
        return {status: 'join_failed', prompt: 'Email is invalid.'}
      } else if (action.payload.value.errors.email[0] == 'has already been taken') {
        return {status: 'join_failed', prompt: 'Email has already in use.'}
      }
    case 'ACTIVATE_ZILTAG_INPUT':
    case 'ZILTAG_INPUT_SIGN_IN':
    case 'ZILTAG_INPUT_JOIN':
    case 'PSEUDO_COMMENT_JOIN':
    case 'PSEUDO_COMMENT_SIGN_IN':
      return {...state, status: null, prompt: null}
    default:
      return state
  }
}

function avatar_menu(state={}, action) {
  switch (action.type) {
    case 'ACTIVATE_AVATAR_MENU':
      return {activated: true}
    case 'DEACTIVATE_AVATAR_MENU':
      return {activated: false}
    default:
      return state
  }
}

function ziltag_map(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_MAP_FETCHED':
      const ziltag_map_state = action.payload.value
      ziltag_map_state.ziltags = ziltag_map_state.ziltags.map(ziltag => {
        ziltag.link = `/ziltags/${ziltag.id}`
        ziltag.co_div = {activated: false}
        return ziltag
      })
      return ziltag_map_state
    case 'HOVER_ON_ZILTAG':
    case 'UNHOVER_ON_ZILTAG':
      const co_div_state = {...state}
      var index = state.ziltags.findIndex(x => x.id == action.payload)
      co_div_state.ziltags[index].co_div = {
        activated: action.type == 'HOVER_ON_ZILTAG' ? true : false
      }
      return co_div_state
    case 'ZILTAG_EDITED':
      const edited_state = {...state}
      var index = state.ziltags.findIndex(
        x => x.id == action.payload.value.id
      )
      edited_state.ziltags[index].content = action.payload.value.content
      return edited_state
    case 'SSE_ZILTAG_CREATED':
      const sse_ziltag_created_state = {...state}
      const created_ziltag = action.payload.value
      created_ziltag.link = `/ziltags/${created_ziltag.id}`
      created_ziltag.co_div = {activated: false}
      sse_ziltag_created_state.ziltags.push(created_ziltag)
      return sse_ziltag_created_state
    case 'SSE_ZILTAG_UPDATED':
      const sse_ziltag_updated_state = {...state}
      const updated_ziltag = action.payload.value
      var index = state.ziltags.findIndex(
        x => x.id == updated_ziltag.id
      )
      sse_ziltag_updated_state.ziltags[index].content = updated_ziltag.content
      return sse_ziltag_updated_state
    case 'SSE_ZILTAG_DELETED':
      const sse_ziltag_deleted_state = {...state}
      const deleted_ziltag = action.payload
      var index = state.ziltags.findIndex(
        x => x.id == deleted_ziltag.id
      )
      sse_ziltag_deleted_state.ziltags.splice(index, 1)
      return sse_ziltag_deleted_state
    default:
      return state
  }
}

function current_ziltag(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_FETCHED':
    case 'ZILTAG_CREATED':
      return action.payload.value
    case 'SSE_COMMENT_CREATED':
      return {...state, comments: [action.payload.value, ...state.comments]}
    case 'ACTIVATE_ZILTAG_EDIT_MODE':
      return {...state, mode: 'edit'}
    case 'DEACTIVATE_ZILTAG_EDIT_MODE':
      return {...state, mode: 'read'}
    case 'ACTIVATE_ZILTAG_DELETE_MODE':
      return {...state, mode: 'delete'}
    case 'DEACTIVATE_ZILTAG_DELETE_MODE':
      return {...state, mode: 'read'}
    case 'ZILTAG_EDITED':
      return action.payload.value
    case 'SSE_COMMENT_UPDATED':
      const comment_edited_state = {...state}
      var index = state.comments.findIndex(
        x => x.id == action.payload.value.id
      )
      comment_edited_state.comments[index] = {
        ...state.comments[index],
        content: action.payload.value.content
      }
      return comment_edited_state
    case 'SSE_COMMENT_DELETED':
      const comment_deleted_state = {...state}
      var index = state.comments.findIndex(
        x => x.id == action.payload.id
      )
      comment_deleted_state.comments.splice(index, 1)
      return comment_deleted_state
    case 'SSE_ZILTAG_UPDATED':
      const updated_ziltag = action.payload.value
      if (updated_ziltag.id == state.id) {
        return updated_ziltag
      }
    case 'ZILTAG_DELETED':
    case 'SSE_ZILTAG_DELETED':
      const deleted_ziltag = action.payload
      if (deleted_ziltag.id == state.id) {
        deleted_ziltag.map_id = state.map_id
        deleted_ziltag.deleted = true
        return deleted_ziltag
      }
    default:
      return state
  }
}

function ziltag_input(state={}, action) {
  switch (action.type) {
    case 'ACTIVATE_ZILTAG_INPUT':
      return {
        ...action.payload,
        mode: 'ziltag',
        activated: true,
        co_div: {activated: true}
      }
    case 'DEACTIVATE_ZILTAG_INPUT':
      return {activated: false}
    case 'ZILTAG_INPUT_SIGN_IN':
      return {...state, mode: 'sign_in'}
    case 'ZILTAG_INPUT_JOIN':
      return {...state, mode: 'join'}
    case 'ZILTAG_INPUT_CHANGED':
      return {...state, content: action.payload.target.value}
    default:
      return state
  }
}

function ziltag_editor(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_EDITOR_CHANGED':
      return {...state, content: action.payload.target.value}
    default:
      return state
  }
}

function ziltag_comment_input(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_COMMENT_INPUT_CHANGED':
      return {...state, content: action.payload.target.value}
    case 'ZILTAG_COMMENT_CREATED':
      return {}
    default:
      return state
  }
}

function ziltag_comment_editors(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_COMMENT_EDITOR_CHANGED':
      const edited_state = {...state}
      edited_state[action.payload.id] = {
        ...edited_state[action.payload.id],
        content: action.payload.target.value
      }
      return edited_state
    case 'ACTIVATE_ZILTAG_COMMENT_EDIT_MODE':
      const activated_edit_state = {...state}
      activated_edit_state[action.payload] = {
        ...state[action.payload]
      }
      activated_edit_state[action.payload].mode = 'edit'
      return activated_edit_state
    case 'DEACTIVATE_ZILTAG_COMMENT_EDIT_MODE':
      const deactivated_edit_state = {...state}
      deactivated_edit_state[action.payload] = {
        ...state[action.payload]
      }
      deactivated_edit_state[action.payload].mode = 'read'
      return deactivated_edit_state
    case 'ACTIVATE_ZILTAG_COMMENT_DELETE_MODE':
      const activated_delete_state = {...state}
      activated_delete_state[action.payload] = {
        ...state[action.payload]
      }
      activated_delete_state[action.payload].mode = 'delete'
      return activated_delete_state
    case 'DEACTIVATE_ZILTAG_COMMENT_DELETE_MODE':
      const deactivated_delete_state = {...state}
      deactivated_delete_state[action.payload] = {
        ...state[action.payload]
      }
      deactivated_delete_state[action.payload].mode = 'read'
      return deactivated_delete_state
    default:
      return state
  }
}

function join_form(state={}, action) {
  switch (action.type) {
    case 'JOIN_FORM_NAME_CHANGED':
      return {...state, name: action.payload.target.value}
    case 'JOIN_FORM_EMAIL_CHANGED':
      return {...state, email: action.payload.target.value}
    default:
      return state
  }
}

function sign_in_form(state={}, action) {
  switch (action.type) {
    case 'SIGN_IN_FORM_USER_CHANGED':
      return {...state, user: action.payload.target.value}
    case 'SIGN_IN_FORM_PASSWORD_CHANGED':
      return {...state, password: action.payload.target.value}
    default:
      return state
  }
}

function pseudo_comment(state={}, action) {
  switch (action.type) {
    case 'ACTIVATE_PSEUDO_COMMENT':
      return {...state, mode: 'read'}
    case 'DEACTIVATE_PSEUDO_COMMENT':
      return {...state, mode: null}
    case 'PSEUDO_COMMENT_JOIN':
      return {...state, mode: 'join'}
    case 'PSEUDO_COMMENT_SIGN_IN':
      return {...state, mode: 'sign_in'}
    default:
      return state
  }
}

function resend_verification_mail_tip(state={}, action) {
  switch (action.type) {
    case 'VERIFICATION_MAIL_RESENDED':
      return {done: true, ...action.payload}
    default:
      return state
  }
}

function extract_youtube_ids(text) {
  /*
    got from https://stackoverflow.com/questions/5830387/how-to-find-all-youtube-video-ids-in-a-string-using-a-regex
    might have little bugs.
  */
  const regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig
  const delimiter = String.fromCharCode('\u0008')

  return text.replace(regex, url => {
    return delimiter + url + delimiter
  })
  .split(delimiter)
  .map(token => {
    if (regex.test(token)) {
      return token.replace(regex, '$1')
    }
    return ''
  })
  .filter(x => x)
}

function media_carousel(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_EDITOR_CHANGED':
      var youtube_ids = extract_youtube_ids(action.payload.target.value)
      return {
        ...state,
        youtube_ids,
        active_index: state.active_index || (youtube_ids ? 0 : -1),
        end_index: youtube_ids ? youtube_ids.length - 1 : -1
      }
    case 'ZILTAG_FETCHED':
      var youtube_ids = extract_youtube_ids(action.payload.value.content)
      return {
        ...state,
        youtube_ids,
        active_index: state.active_index || (youtube_ids ? 0 : -1),
        end_index: youtube_ids ? youtube_ids.length - 1 : -1
      }
    case 'GO_NEXT_MEDIA_CONTENT':
      const go_next_state = {...state}
      return {
        ...state,
        active_index: state.active_index + 1,
        direction: 'next'
      }
    case 'GO_PREV_MEDIA_CONTENT':
      const go_prev_state = {...state}
      return {
        ...state,
        active_index: state.active_index - 1,
        direction: 'prev'
      }
    default:
      return state
  }
}

function social_media_menu(state={}, action) {
  switch (action.type) {
    case 'ACTIVATE_SOCIAL_MEDIA_MENU':
      return {activated: true}
    case 'DEACTIVATE_SOCIAL_MEDIA_MENU':
      return {activated: false}
    default:
      return state
  }
}

export default combineReducers({
  router: routerStateReducer,
  current_user,
  avatar_menu,
  ziltag_map,
  current_ziltag,
  ziltag_input,
  ziltag_editor,
  ziltag_comment_input,
  ziltag_comment_editors,
  join_form,
  sign_in_form,
  pseudo_comment,
  resend_verification_mail_tip,
  media_carousel,
  social_media_menu
})

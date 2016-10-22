import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'


function client_state(state={}, action) {
  switch (action.type) {
    case 'UPDATE_CLIENT_STATE':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

function current_user(state={}, action) {
  switch (action.type) {
    case 'CURRENT_USER_FETCHED':
    case 'CURRENT_USER_SIGNED_IN':
    case 'CURRENT_USER_JOINED':
      return {...action.payload.value, status: 'success'}
    case 'CURRENT_USER_SIGNED_OUT':
      return {}
    case 'CURRENT_USER_SIGN_IN_FAILED':
      return {...state, status: 'sign_in_failed', prompt: action.payload.value.error}
    case 'CURRENT_USER_JOIN_FAILED':
      return {...state, status: 'join_failed', prompt: action.payload.value.error}
    case 'FORGOT_PASSWORD_EMAIL_NOT_FOUND':
      return {...state, status: 'email_not_found', prompt: action.payload.error}
    case 'FORGOT_PASSWORD_EMAIL_SENT':
      return {...state, status: 'email_sent', prompt: action.payload.message}
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

function ziltag_maps(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_MAP_FETCHED':
      return {...state, [action.payload.value.id]: action.payload.value}
    default:
      return state
  }
}

function ziltags(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_MAP_FETCHED':
      const ziltag_map_fetched_state = {...state}
      for (const ziltag of action.payload.value.ziltags) {
        ziltag_map_fetched_state[ziltag.id] = {
          ...ziltag_map_fetched_state[ziltag.id],
          ...ziltag,
          map_id: action.payload.value.id
        }
      }
      return ziltag_map_fetched_state
    case 'ZILTAG_EDITED':
      return {...state, [action.payload.value.id]: {
        ...state[action.payload.value.id],
        content: action.payload.value.content
      }}
    case 'ZILTAG_FETCHED':
    case 'ZILTAG_CREATED':
    case 'SSE_ZILTAG_CREATED':
    case 'SSE_ZILTAG_UPDATED':
      return {
        ...state,
        [action.payload.value.id]: {
          ...state[action.payload.value.id],
          ...action.payload.value
        }
      }
    case 'ZILTAG_DELETED':
    case 'SSE_ZILTAG_DELETED':
      return delete_key(state, action.payload.id)
    default:
      return state
  }
}

function co_divs(state={}, action) {
  switch (action.type) {
    case 'HOVER_ON_ZILTAG':
    case 'UNHOVER_ON_ZILTAG':
      return {...state, [action.payload]: {
        activated: action.type == 'HOVER_ON_ZILTAG' ? true : false
      }}
    case 'ZILTAG_MAP_FETCHED':
      const ziltag_map_fetched_state = {...state}
      for (const ziltag of action.payload.value.ziltags) {
        ziltag_map_fetched_state[ziltag.id] = {activated: false}
      }
      return ziltag_map_fetched_state
    case 'ZILTAG_FETCHED':
    case 'ZILTAG_CREATED':
    case 'SSE_ZILTAG_CREATED':
      return {...state, [action.payload.value.id]: {activated: false}}
    case 'ZILTAG_DELETED':
    case 'SSE_ZILTAG_DELETED':
      return delete_key(state, action.payload.id)
    default:
      return state
  }
}

function comments(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_FETCHED':
      const ziltag_fetched_state = {...state}
      for (const comment of action.payload.value.comments) {
        ziltag_fetched_state[comment.id] = {
          ...comment,
          ziltag_id: action.payload.value.id
        }
      }
      return ziltag_fetched_state
    case 'SSE_COMMENT_CREATED':
    case 'SSE_COMMENT_UPDATED':
      return {...state, [action.payload.value.id]: action.payload.value}
    case 'SSE_COMMENT_DELETED':
      return delete_key(state, action.payload.id)
    case 'ZILTAG_DELETED':
    case 'SSE_ZILTAG_DELETED':
      const ziltag_deleted_state = {...state}
      for (const id in state) {
        if (state[id].ziltag_id === action.payload.id) {
          delete ziltag_deleted_state[id]
        }
      }
      return ziltag_deleted_state
    default:
      return state
  }
}

function current_ziltag_map_id(state=null, action) {
  switch (action.type) {
    case 'ZILTAG_MAP_FETCHED':
      return action.payload.value.id
    case 'SET_CURRENT_ZILTAG_MAP_ID':
      return action.payload
    default:
      return state
  }
}

function current_ziltag_id(state=null, action) {
  switch (action.type) {
    case 'SET_CURRENT_ZILTAG_ID':
      return action.payload
    case 'ZILTAG_CREATED':
      return action.payload.value.id
    case 'ZILTAG_DELETED':
    case 'SSE_ZILTAG_DELETED':
      if (action.payload.id === state) {
        return null
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
    case 'ZILTAG_INPUT_FORGOT_PASSWORD':
      return {...state, mode: 'forgot_password'}
    case 'ZILTAG_INPUT_CHANGED':
      return {...state, content: action.payload.target.value}
    case 'CURRENT_USER_JOINED':
      return {...state, mode: 'post_join'}
    default:
      return state
  }
}

function ziltag_editor(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_EDITOR_CHANGED':
      return {...state, content: action.payload.target.value}
    case 'ACTIVATE_ZILTAG_EDIT_MODE':
      return {mode: 'edit', content: action.payload}
    case 'ACTIVATE_ZILTAG_DELETE_MODE':
      return {...state, mode: 'delete'}
    case 'SET_CURRENT_ZILTAG_ID':
    case 'ZILTAG_EDITED':
    case 'DEACTIVATE_ZILTAG_EDIT_MODE':
    case 'DEACTIVATE_ZILTAG_DELETE_MODE':
      return {mode: 'read'}
    default:
      return state
  }
}

function ziltag_comment_input(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_COMMENT_INPUT_CHANGED':
      return {...state, content: action.payload.target.value}
    case 'CLEAN_ZILTAG_COMMENT_INPUT':
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

function forgot_password_form(state={}, action) {
  switch (action.type) {
    case 'FORGOT_PASSWORD_FORM_EMAIL_CHANGED':
      return {...state, email: action.payload.target.value}
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
    case 'PSEUDO_COMMENT_FORGOT_PASSWORD':
      return {...state, mode: 'forgot_password'}
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

function window_event(state={}, action) {
  switch (action.type) {
    case 'WINDOW_RESIZED':
      return {event_name: 'resize'}
    default:
      return state
  }
}

function delete_key(state, key) {
  const key_deleted_state = {...state}
  delete key_deleted_state[key]
  return key_deleted_state
}

function errors(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_MAP_FETCH_FAILED':
      return {...state, ziltag_map: action.payload.value}
    case 'ZILTAG_MAP_FETCHED':
      return delete_key(state, 'ziltag_map')
    case 'ZILTAG_FETCH_FAILED':
      return {...state, ziltag: action.payload.value}
    case 'ZILTAG_FETCHED':
      return delete_key(state, 'ziltag')
    default:
      return state
  }
}

export default combineReducers({
  router: routerStateReducer,
  client_state,
  current_user,
  avatar_menu,
  ziltag_maps,
  ziltags,
  co_divs,
  comments,
  current_ziltag_map_id,
  current_ziltag_id,
  ziltag_input,
  ziltag_editor,
  ziltag_comment_input,
  ziltag_comment_editors,
  join_form,
  sign_in_form,
  forgot_password_form,
  pseudo_comment,
  resend_verification_mail_tip,
  media_carousel,
  social_media_menu,
  window_event,
  errors
})

import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'


function current_user(state={}, action) {
  switch (action.type) {
    case 'CURRENT_USER_FETCHED':
    case 'CURRENT_USER_LOGGED_IN':
      return action.payload.value
    case 'CURRENT_USER_LOGGED_OUT':
      return {}
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
      edited_state.ziltags[index].preview = action.payload.value.content
      return edited_state
    default:
      return state
  }
}

function current_ziltag(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_FETCHED':
    case 'ZILTAG_CREATED':
      return action.payload.value
    case 'ZILTAG_COMMENT_CREATED':
      return {...state, comments: [action.payload.value, ...state.comments]}
    case 'ACTIVATE_ZILTAG_EDITOR':
      return {...state, mode: 'edit'}
    case 'DEACTIVATE_ZILTAG_EDITOR':
      return {...state, mode: 'read'}
    case 'ZILTAG_EDITED':
      return action.payload.value
    case 'ZILTAG_COMMENT_EDITED':
      const comment_edited_state = {...state}
      var index = state.comments.findIndex(
        x => x.id == action.payload.value.id
      )
      comment_edited_state.comments[index] = {
        ...state.comments[index],
        content: action.payload.value.content
      }
      return comment_edited_state
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
    case 'ZILTAG_INPUT_LOGIN':
      return {...state, mode: 'login'}
    case 'ZILTAG_INPUT_SIGN_UP':
      return {...state, mode: 'sign_up'}
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
    case 'ACTIVATE_ZILTAG_COMMENT_EDITOR':
      const activated_state = {...state}
      activated_state[action.payload] = {
        ...activated_state[action.payload]
      }
      activated_state[action.payload].mode = 'edit'
      return activated_state
    case 'DEACTIVATE_ZILTAG_COMMENT_EDITOR':
      const deactivated_state = {...state}
      deactivated_state[action.payload] = {
        ...deactivated_state[action.payload]
      }
      deactivated_state[action.payload].mode = 'read'
      return deactivated_state
    default:
      return state
  }
}

function sign_up_form(state={}, action) {
  switch (action.type) {
    case 'SIGN_UP_FORM_NAME_CHANGED':
      return {...state, name: action.payload.target.value}
    case 'SIGN_UP_FORM_EMAIL_CHANGED':
      return {...state, email: action.payload.target.value}
    default:
      return state
  }
}

function login_form(state={}, action) {
  switch (action.type) {
    case 'LOGIN_FORM_USER_CHANGED':
      return {...state, user: action.payload.target.value}
    case 'LOGIN_FORM_PASSWORD_CHANGED':
      return {...state, password: action.payload.target.value}
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
  sign_up_form,
  login_form
})

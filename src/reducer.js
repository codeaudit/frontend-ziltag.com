import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'


function current_user(state={}, action) {
  switch (action.type) {
    case 'CURRENT_USER_FETCHED':
      return action.payload.value
    default:
      return state
  }
}

function avatar_menu(state={}, action) {
  switch (action.type) {
    case 'ACTIVATE_AVATAR_MENU':
      return {avatar_menu_activated: true}
    case 'DEACTIVATE_AVATAR_MENU':
      return {avatar_menu_activated: false}
    default:
      return state
  }
}

function ziltag_map(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_MAP_FETCHED':
      return action.payload.value
    case 'HOVER_ON_ZILTAG':
    case 'UNHOVER_ON_ZILTAG':
      const hover_state = {...state}
      const index = state.ziltags.findIndex((x) => x.id == action.payload)
      hover_state.ziltags[index].hovered = action.type == 'HOVER_ON_ZILTAG'
      ? true : false
      return hover_state
    default:
      return state
  }
}

function current_ziltag(state={}, action) {
  switch (action.type) {
    case 'ZILTAG_FETCHED':
      return action.payload.value
    default:
      return state
  }
}

export default combineReducers({
  router: routerStateReducer,
  current_user,
  avatar_menu,
  ziltag_map,
  current_ziltag
})

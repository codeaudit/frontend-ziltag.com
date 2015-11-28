import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'


function user_info(state={}, action) {
  switch (action.type) {
    case 'USER_INFO_FETCHED':
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

export default combineReducers({
  router: routerStateReducer,
  user_info,
  avatar_menu
})

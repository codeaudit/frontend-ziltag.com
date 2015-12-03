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
      const index = state.ziltags.findIndex((x) => x.id == action.payload)
      co_div_state.ziltags[index].co_div = {
        activated: action.type == 'HOVER_ON_ZILTAG' ? true : false
      }
      return co_div_state
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

function ziltag_input(state={}, action) {
  switch (action.type) {
    case 'ACTIVATE_ZILTAG_INPUT':
      return {...action.payload, activated: true, co_div: {activated: true}}
    case 'DEACTIVATE_ZILTAG_INPUT':
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
  ziltag_input
})

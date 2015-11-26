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

export default combineReducers({
  router: routerStateReducer,
  user_info
})

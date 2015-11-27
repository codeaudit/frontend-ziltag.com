import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAction} from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'

import BasePage from '../component/BasePage'
import AvatarMenu from '../component/AvatarMenu'

import {RAILS_ADDR} from '../../env'


class ZiltagMapPage extends Component {
  constructor(props) {
    super(props)
    this.user_info_fetched = createAction('USER_INFO_FETCHED')
  }

  get_user_info() {
    const api = `${RAILS_ADDR}/api/v1/me`
    return bind(fetch(api, {
      credentials: 'include'
    }), this.user_info_fetched)
  }

  componentDidMount() {
    this.props.dispatch(this.get_user_info())
  }

  render() {
    const {
      router,
      user_info,
      avatar_menu,
      dispatch
    } = this.props

    return (
      <BasePage dispatch={dispatch} user_info={user_info}>
        <AvatarMenu style={{display: avatar_menu.avatar_menu_activated ? 'block' : 'none'}}/>
      </BasePage>
    )
  }
}

export default connect(state => state)(ZiltagMapPage)

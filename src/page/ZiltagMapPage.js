import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAction} from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'

import BasePage from '../component/BasePage'

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
      user_info
    } = this.props

    console.log('user_info:', user_info)

    return <BasePage user_info={user_info}>ZiltagMapPage {router.params.id}</BasePage>
  }
}

export default connect(state => state)(ZiltagMapPage)

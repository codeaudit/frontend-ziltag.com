import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router'

import BasePage from '../../component/BasePage'
import * as actors from '../../actor'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagPage extends Component {

  constructor(props) {
    super(props)
    this.actors = bindActionCreators({...actors, pushState}, this.props.dispatch)
  }

  componentDidMount() {
    this.actors.fetch_current_user()
    this.actors.fetch_ziltag(this.props.router.params.id)
    .then(action => this.actors.fetch_ziltag_map(action.payload.value.map_id))
  }

  render() {
    const {
      current_ziltag
    } = this.props

    return (
      <div className='ziltag-ziltag-page'>
        <BasePage
          {...this.props}
          {...this.actors}
        >
          <div className='ziltag-ziltag-page__op'>
            <img
              className='ziltag-ziltag-page__op-avatar'
              src={current_ziltag.usr && current_ziltag.usr.avatar}
            />
            <div className='ziltag-ziltag-page__op-left'>
              <div className='ziltag-ziltag-page__op-prompt'>
                Tag created by
              </div>
              <div className='ziltag-ziltag-page__op-name'>
                {current_ziltag.usr && current_ziltag.usr.name}
              </div>
            </div>
            <div className='ziltag-ziltag-page__op-right'>
              <div className='ziltag-ziltag-page__close'>
              </div>
              <div className='ziltag-ziltag-page__share'>
              </div>
            </div>
          </div>
        </BasePage>
      </div>
    )
  }
}

export default connect(state => state)(ZiltagPage)

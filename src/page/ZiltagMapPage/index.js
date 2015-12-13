import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router'

import BasePage from '../../component/BasePage'
import * as actors from '../../actor'


class ZiltagMapPage extends Component {
  constructor(props) {
    super(props)
    this.actors = bindActionCreators({...actors, pushState}, this.props.dispatch)
  }

  componentDidMount() {
    this.actors.fetch_current_user()
    this.actors.fetch_ziltag_map(this.props.router.params.id)
  }

  render() {
    return (
      <BasePage
        {...this.props}
        {...this.actors}
      />
    )
  }
}

export default connect(state => state)(ZiltagMapPage)

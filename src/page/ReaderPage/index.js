import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {push} from 'redux-router'
import classNames from 'classnames'

import BasePage from '../../component/BasePage'
import Avatar from '../../component/Avatar'
import Ziltag404Page from '../../component/Ziltag404Page'

import * as actors from '../../actor'


if (process.env.NODE_ENV != 'production') {
  const NODE_ENV = require('../../../env').NODE_ENV
  if (NODE_ENV == 'dev') {
    var DevTools = require('../../devtool').default
    var ENABLE_DEVTOOL = require('../../../env').ENABLE_DEVTOOL
  }
}


class ReaderPage extends Component {
  constructor(props) {
    super(props)
    this.actors = bindActionCreators({...actors, push}, this.props.dispatch)
    this.state = {is_mounted: false}
  }

  componentDidMount() {
    this.setState({is_mounted: true})
  }

  render() {
    return (
      <div>
        {
          process.env.NODE_ENV != 'production'
          ? this.state.is_mounted && ENABLE_DEVTOOL && <DevTools/>
          : ''
        }
        <BasePage
          {...this.props}
          {...this.actors}
        />
      </div>
    )
  }
}

export default connect(state => state)(ReaderPage)

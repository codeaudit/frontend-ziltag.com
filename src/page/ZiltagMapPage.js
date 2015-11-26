import React, {Component} from 'react'
import {connect} from 'react-redux'

import BasePage from '../component/BasePage'


class ZiltagMapPage extends Component {
  render() {
    const {
      router
    } = this.props

    return <BasePage>ZiltagMapPage {router.params.id}</BasePage>
  }
}

export default connect(state => state)(ZiltagMapPage)

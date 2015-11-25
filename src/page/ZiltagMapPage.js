import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class ZiltagMapPage extends Component {
  render() {
    const {
      router
    } = this.props

    return <div>ZiltagMapPage {router.params.id}</div>
  }
}

export default connect(state => state)(ZiltagMapPage)

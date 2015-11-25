import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class ZiltagPage extends Component {
    render() {
      const {
        router
      } = this.props

      return <div>ZiltagPage {this.props.router.params.id}</div>
    }
}

export default connect(state => state)(ZiltagPage)

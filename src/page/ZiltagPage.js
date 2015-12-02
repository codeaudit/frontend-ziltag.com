import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import BasePage from '../component/BasePage'
import * as actors from '../actor'


class ZiltagPage extends Component {

  constructor(props) {
    super(props)
    this.actors = bindActionCreators(actors, this.props.dispatch)
  }

  componentDidMount() {
    this.actors.fetch_current_user()
    this.actors.fetch_ziltag(this.props.router.params.id)
    .then(resp => this.actors.fetch_ziltag_map(resp.payload.value.map_id))
  }

  render() {
    const {
      router,
      current_user,
      avatar_menu,
      current_ziltag,
      ziltag_map
    } = this.props

    const {
      activate_avatar_menu,
      deactivate_avatar_menu,
      fetch_ziltag,
      hover_on_ziltag,
      unhover_on_ziltag
    } = this.actors

    const enhanced_ziltag_map = Object.assign({}, ziltag_map)
    if (ziltag_map.ziltags) {
      enhanced_ziltag_map.ziltags = enhanced_ziltag_map.ziltags.map(ziltag => {
        if (ziltag.id == current_ziltag.id) {
          ziltag.focused = true
        } else {
          ziltag.focused = false
        }
        return ziltag
      })
    }

    return (
      <BasePage
        current_user={current_user}
        avatar_menu={avatar_menu}
        ziltag_map={enhanced_ziltag_map}
        activate_avatar_menu={activate_avatar_menu}
        deactivate_avatar_menu={deactivate_avatar_menu}
        fetch_ziltag={fetch_ziltag}
        hover_on_ziltag={hover_on_ziltag}
        unhover_on_ziltag={unhover_on_ziltag}
      />
    )
  }
}

export default connect(state => state)(ZiltagPage)

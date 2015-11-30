import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import BasePage from '../component/BasePage'
import AvatarMenu from '../component/AvatarMenu'
import * as actors from '../actor'


class ZiltagMapPage extends Component {
  constructor(props) {
    super(props)
    this.actors = bindActionCreators(actors, this.props.dispatch)
  }

  componentDidMount() {
    this.actors.get_user_info()
  }

  render() {
    const {
      router,
      user_info,
      avatar_menu
    } = this.props

    const {
      activate_avatar_menu,
      deactivate_avatar_menu
    } = this.actors

    return (
      <BasePage
        activate_avatar_menu={activate_avatar_menu}
        deactivate_avatar_menu={deactivate_avatar_menu}
        user_info={user_info}
      >
        <AvatarMenu style={{display: avatar_menu.avatar_menu_activated ? 'block' : 'none'}}/>
      </BasePage>
    )
  }
}

export default connect(state => state)(ZiltagMapPage)

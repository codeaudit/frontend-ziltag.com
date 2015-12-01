import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import BasePage from '../component/BasePage'
import ZiltagMapLoginForm from '../component/ZiltagMapLoginForm'
import ZiltagMapSignUpForm from '../component/ZiltagMapSignUpForm'
import * as actors from '../actor'


class ZiltagMapPage extends Component {
  constructor(props) {
    super(props)
    this.actors = bindActionCreators(actors, this.props.dispatch)
  }

  componentDidMount() {
    this.actors.get_user_info()
    this.actors.get_ziltag_map(this.props.router.params.id)
  }

  render() {
    const {
      router,
      user_info,
      avatar_menu,
      ziltag_map
    } = this.props

    const {
      activate_avatar_menu,
      deactivate_avatar_menu
    } = this.actors

    return (
      <BasePage
        user_info={user_info}
        avatar_menu={avatar_menu}
        ziltag_map={ziltag_map}
        activate_avatar_menu={activate_avatar_menu}
        deactivate_avatar_menu={deactivate_avatar_menu}
      >
        <ZiltagMapLoginForm/>
        <ZiltagMapSignUpForm/>
      </BasePage>
    )
  }
}

export default connect(state => state)(ZiltagMapPage)

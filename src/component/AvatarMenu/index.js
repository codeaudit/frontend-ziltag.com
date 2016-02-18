import React, {Component} from 'react'

import DropDownMenu, {Item} from '../DropDownMenu'


class AvatarMenu extends Component {
  render() {
    const {
      activated,
      current_ziltag,
      current_user_logout,
      fetch_ziltag
    } = this.props

    const style = {
      display: activated ? 'block' : 'none'
    }

    return (
      <DropDownMenu style={style} className='ziltag-base-page__avatar-menu'>
        <Item><a href='/users/edit'>Setting</a></Item>
        <hr/>
        <Item onClick={() => {
          current_user_logout()
          .then(() => {
            if (current_ziltag.id) {
              fetch_ziltag(current_ziltag.id)
            }
          })
        }}>Logout</Item>
      </DropDownMenu>
    )
  }
}

export default AvatarMenu

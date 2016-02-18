import React, {Component} from 'react'

import DropDownMenu, {Item} from '../DropDownMenu'


class SocialMediaMenu extends Component {
  render() {
    const {
      activated
    } = this.props

    const style = {
      display: activated ? 'block' : 'none'
    }

    return (
      <DropDownMenu
        style={style}
        className='ziltag-ziltag-page__social-media-menu'
      >
        <Item>test1</Item>
        <Item>test2</Item>
      </DropDownMenu>
    )
  }
}

export default SocialMediaMenu

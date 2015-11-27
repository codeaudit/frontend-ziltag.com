import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


const Item = (props) => (
  <li className='ziltag-base-page__avatar-menu-item'>
    {props.children}
  </li>
)

class AvatarMenu extends Component {
  render() {
    return (
      <ul style={this.props.style} className='ziltag-base-page__avatar-menu'>
        <Item>Setting</Item>
        <Item>Term of Use</Item>
        <Item>Privacy</Item>
        <hr/>
        <Item>Logout</Item>
      </ul>
    )
  }
}

export default AvatarMenu

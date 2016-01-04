import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


const Item = (props) => (
  <li onClick={props.onClick} className='ziltag-base-page__avatar-menu-item'>
    {props.children}
  </li>
)

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
      <ul style={style} className='ziltag-base-page__avatar-menu'>
        <Item>Setting</Item>
        <Item>Term of Use</Item>
        <Item>Privacy</Item>
        <hr/>
        <Item onClick={() => {
          current_user_logout()
          .then(()=>{ fetch_ziltag(current_ziltag.id) })
        }}>Logout</Item>
      </ul>
    )
  }
}

export default AvatarMenu

import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class DropDownMenu extends Component {
  render() {
    const {
      style,
      className,
      children
    } = this.props

    return (
      <ul
        style={style}
        className={classNames('ziltag-drop-down-menu', className)}
      >
        {children}
      </ul>
    )
  }
}

export default DropDownMenu

class Item extends Component {
  render() {
    const {
      children
    } = this.props

    return (
      <li className='ziltag-drop-down-menu-item'>
        {children}
      </li>
    )
  }
}

export {Item}

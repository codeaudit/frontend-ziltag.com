import React, {Component} from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class Ziltag extends Component {
  render() {
    const {
      onClick,
      onMouseEnter,
      onMouseLeave,
      ziltag
    } = this.props

    const radius = 6

    const style = {
      top: ziltag.y - radius,
      left: ziltag.x - radius,
    }

    return (
      <Link to={ziltag.link} onClick={onClick}>
        <div
          style={style}
          className={
            classNames({
              'ziltag-ziltag': true,
              'ziltag-ziltag--focused': ziltag.focused
            })
          }
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
        </div>
      </Link>
    )
  }
}

export default Ziltag

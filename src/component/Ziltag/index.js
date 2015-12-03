import React, {Component} from 'react'
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

    const radius = 12

    const style = {
      top: ziltag.y - radius,
      left: ziltag.x - radius,
    }

    return (
      <div
        style={style}
        className={
          classNames({
            'ziltag-ziltag': true,
            'ziltag-ziltag--activated': ziltag.activated
          })
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
      </div>
    )
  }
}

export default Ziltag

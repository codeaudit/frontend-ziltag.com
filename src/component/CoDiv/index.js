import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class CoDiv extends Component {
  render() {
    const {
      onClick,
      ziltag,
      ziltag_map,
      children
    } = this.props

    const direction = ziltag.x < 0.5 ? 'right' : 'left'
    const x_offset = 30
    const y_offset = -30

    const style = {
      display: ziltag.co_div.activated ? 'block' : 'none',
      top: ziltag.y_px + y_offset
    }

    if (direction == 'left') {
      style.right = ziltag_map.width - ziltag.x_px + x_offset
    } else if (direction == 'right') {
      style.left = ziltag.x_px + x_offset
    }

    return (
      <div
        style={style}
        className={
          classNames({
            'ziltag-co-div': true,
            'ziltag-co-div--left': direction == 'left',
            'ziltag-co-div--right': direction == 'right'
          })
        }
        onClick={onClick}
      >
      {children}
      </div>
    )
  }
}

export default CoDiv

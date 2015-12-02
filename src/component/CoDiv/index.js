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
      direction,
      ziltag,
      children
    } = this.props

    const x_offset = direction == 'left' ? -350 : 36
    const y_offset = -24

    const style = {
      position: 'absolute',
      display: ziltag.hovered ? 'block' : 'none',
      top: ziltag.y + y_offset,
      left: ziltag.x + x_offset
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
      >
      {children}
      </div>
    )
  }
}

export default CoDiv

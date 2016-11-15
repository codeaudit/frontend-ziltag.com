import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


export const meta_class_name = 'ziltag-ziltag'

class Ziltag extends Component {
  render() {
    const {
      onClick,
      onMouseEnter,
      onMouseLeave,
      ziltag
    } = this.props

    const radius = 10

    const style = {
      top: ziltag.y_px - radius,
      left: ziltag.x_px - radius,
    }

    return (
      <div
        style={style}
        className={
          classNames({
            [meta_class_name]: true,
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

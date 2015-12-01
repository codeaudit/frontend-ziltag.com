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
      data
    } = this.props

    const radius = 6

    const style = {
      top: data.y - radius,
      left: data.x - radius,
    }

    return (
      <div
        style={style}
        className={
          classNames({
            'ziltag-ziltag': true,
            'ziltag-ziltag--focused': data.focused
          })
        }
      ></div>
    )
  }
}

export default Ziltag

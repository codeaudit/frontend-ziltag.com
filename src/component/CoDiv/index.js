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
      style,
      children
    } = this.props

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

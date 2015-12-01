import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class DirectedDiv extends Component {
  render() {
    const {
      direction
    } = this.props

    return (
      <div
        className={
          classNames({
            'ziltag-directed-div': true,
            'ziltag-directed-div--left': direction == 'left',
            'ziltag-directed-div--right': direction == 'right'
          })
        }
      >
      </div>
    )
  }
}

export default DirectedDiv

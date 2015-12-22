import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class Avatar extends Component {
  render() {
    return (
      <img
        {...this.props}
        className={classNames(this.props.className, 'ziltag-avatar')}
      />
    )
  }
}

export default Avatar

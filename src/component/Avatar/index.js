import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
    var default_src = require('./default.png')
  }
} catch (e) {}


class Avatar extends Component {
  render() {
    return (
      <img
        {...this.props}
        className={classNames(this.props.className, 'ziltag-avatar')}
        src={this.props.src || default_src}
      />
    )
  }
}

export default Avatar

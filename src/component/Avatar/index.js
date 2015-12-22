import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class Avatar extends Component {
  render() {
    const {
      src,
      className
    } = this.props

    return (
      <img className={classNames(className, 'ziltag-avatar')} src={src}/>
    )
  }
}

export default Avatar

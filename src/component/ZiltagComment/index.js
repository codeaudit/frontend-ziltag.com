import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagComment extends Component {
  render() {
    const {
      content,
      usr
    } = this.props

    return (
      <div className='ziltag-ziltag-comment'>
        <img
          className='ziltag-ziltag-comment__user-avatar' src={usr.avatar}
        />
        <div className='ziltag-ziltag-comment__main'>
          <div className='ziltag-ziltag-comment__user-name'>
            {usr.name}
          </div>
          <div className='ziltag-ziltag-comment__content'>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

export default ZiltagComment

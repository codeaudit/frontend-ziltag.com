import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagCommentInput extends Component {
  render() {
    const {
      onChange,
      onSubmit,
      user,
      ziltag_comment_input
    } = this.props

    return (
      <div className='ziltag-ziltag-comment-input'>
        <img
          className='ziltag-ziltag-comment-input__avatar'
          src={user && user.avatar}
        />
        <textarea onChange={onChange} placeholder='Your text here'/>
        <div
          onClick={() => {
            if (ziltag_comment_input.content) {
              onSubmit()
            }
          }}
          className={classNames({
            'ziltag-ziltag-comment-input__post': true,
            'ziltag-ziltag-comment-input__post--activated':
              ziltag_comment_input.content
          })}
        >
          Post
        </div>
      </div>
    )
  }
}

export default ZiltagCommentInput

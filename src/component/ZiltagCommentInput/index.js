import React, {Component} from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

import Avatar from '../Avatar'


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
      usr,
      ziltag_comment_input,
      activate_pseudo_comment
    } = this.props

    return (
      <div className='ziltag-ziltag-comment-input'>
        <Avatar
          className='ziltag-ziltag-comment-input__avatar'
          src={usr && usr.avatar}
        />
        <TextareaAutosize
          onChange={onChange}
          value={ziltag_comment_input.content || ''}
          placeholder='Your text here'
        />
        <div
          onClick={() => {
            if (usr) {
              if (ziltag_comment_input.content) {
                onSubmit()
              }
            } else {
              activate_pseudo_comment()
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

import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagComment extends Component {
  render() {
    const {
      id,
      content,
      author,
      usr,
      ziltag_comment_editors,
      onChange,
      activate_ziltag_comment_editor,
      deactivate_ziltag_comment_editor,
      edit_ziltag_comment
    } = this.props

    if (usr && author && usr.name == author.name) {
      var edit_operator_components = (
        <div className='ziltag-ziltag-comment__row'>
          <div
            className='ziltag-ziltag-comment__edit-operator'
            onClick={() => {
              activate_ziltag_comment_editor(id)
            }}
          >
            Edit
          </div>
          <div className='ziltag-ziltag-comment__edit-operator'>Delete</div>
        </div>
      )
    }

    if (ziltag_comment_editors[id] &&
        ziltag_comment_editors[id].mode == 'edit') {
      var text_component = (
        <textarea
          className={classNames(
            'ziltag-ziltag-comment__text',
            'ziltag-ziltag-comment__text--editing'
          )}
          autoFocus
          onChange={onChange}
          defaultValue={content}
        />
      )

      var edit_operator_components = (
          <div
            className={classNames(
              'ziltag-ziltag-comment__row',
              'ziltag-ziltag-comment__row--editing',
            )}
          >
            <div
              className='ziltag-ziltag-comment__edit-operator'
              onClick={() => {
                deactivate_ziltag_comment_editor(id)
              }}
            >
              Cancel
            </div>
            <div
              className={
                classNames(
                  'ziltag-ziltag-comment__edit-operator',
                  'ziltag-ziltag-comment__edit-operator--confirm'
                )
              }
              onClick={() => {
                edit_ziltag_comment(id, ziltag_comment_editors[id].content)
                .then(() => deactivate_ziltag_comment_editor(id))
              }}
            >
              Confirm
            </div>
          </div>
      )
    } else {
      var text_component = <div className='ziltag-ziltag-comment__text'>{content}</div>
    }

    return (
      <div className='ziltag-ziltag-comment'>
        <img
          className='ziltag-ziltag-comment__user-avatar' src={author.avatar}
        />
        <div className='ziltag-ziltag-comment__main'>
          <div className='ziltag-ziltag-comment__user-name'>
            {author.name}
          </div>
          {text_component}
          {edit_operator_components}
        </div>
      </div>
    )
  }
}

export default ZiltagComment

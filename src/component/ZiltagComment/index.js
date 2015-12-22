import React, {Component} from 'react'
import classNames from 'classnames'

import Avatar from '../Avatar'


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
      activate_ziltag_comment_edit_mode,
      deactivate_ziltag_comment_edit_mode,
      activate_ziltag_comment_delete_mode,
      deactivate_ziltag_comment_delete_mode,
      edit_ziltag_comment,
      delete_ziltag_comment
    } = this.props

    if (usr && author && usr.name == author.name) {
      var edit_operator_components = (
        <div className='ziltag-ziltag-comment__row'>
          <div
            className='ziltag-ziltag-comment__edit-operator'
            onClick={() => {
              activate_ziltag_comment_edit_mode(id)
            }}
          >
            Edit
          </div>
          <div
            className='ziltag-ziltag-comment__edit-operator'
            onClick={() => {
              activate_ziltag_comment_delete_mode(id)
            }}
          >
            Delete
          </div>
        </div>
      )
    }

    if (ziltag_comment_editors[id] &&
        (ziltag_comment_editors[id].mode == 'edit' ||
        ziltag_comment_editors[id].mode == 'delete')) {

      if (ziltag_comment_editors[id].mode == 'edit') {
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
      } else {
        var text_component = (
          <div className='ziltag-ziltag-comment__text'>{content}</div>
        )
      }

      var edit_operator_components = (
          <div
            className={classNames(
              'ziltag-ziltag-comment__row',
              'ziltag-ziltag-comment__row--editing',
            )}
          >
            {
              ziltag_comment_editors[id].mode == 'delete' && (
                <div
                  className={
                    classNames(
                      'ziltag-ziltag-comment__edit-operator',
                      'ziltag-ziltag-comment__edit-operator--warn'
                    )
                  }
                >
                  Delete?
                </div>
              )
            }
            <div
              className='ziltag-ziltag-comment__edit-operator'
              onClick={() => {
                if (ziltag_comment_editors[id].mode == 'edit') {
                  deactivate_ziltag_comment_edit_mode(id)
                } else if (ziltag_comment_editors[id].mode == 'delete') {
                  delete_ziltag_comment(id)
                }
              }}
            >
              {
                ziltag_comment_editors[id].mode == 'edit'
                ? 'Cancel'
                : ziltag_comment_editors[id].mode == 'delete'
                ? 'Confirm'
                : ''
              }
            </div>
            <div
              className='ziltag-ziltag-comment__edit-operator'
              onClick={() => {
                if (ziltag_comment_editors[id].mode == 'edit') {
                  edit_ziltag_comment(id, ziltag_comment_editors[id].content)
                  .then(() => deactivate_ziltag_comment_edit_mode(id))
                } else if (ziltag_comment_editors[id].mode == 'delete') {
                  deactivate_ziltag_comment_delete_mode(id)
                }
              }}
            >
              {
                ziltag_comment_editors[id].mode == 'edit'
                ? 'Confirm'
                : ziltag_comment_editors[id].mode == 'delete'
                ? 'Cancel'
                : ''
              }
            </div>
          </div>
      )
    } else {
      var text_component = <div className='ziltag-ziltag-comment__text'>{content}</div>
    }

    return (
      <div className='ziltag-ziltag-comment'>
        <Avatar
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

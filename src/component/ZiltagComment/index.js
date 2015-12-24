import React, {Component} from 'react'
import classNames from 'classnames'
import TimeAgo from 'react-timeago'

import Avatar from '../Avatar'


try {
  if (__WEBPACK__) {
    require('./index.css')
    var warn_icon = require('./warn.png')
  }
} catch (e) {}


class ZiltagComment extends Component {
  render() {
    const {
      id,
      content,
      author,
      created_at,
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

        if (ziltag_comment_editors[id].content) {
          var line_count = Math.ceil(ziltag_comment_editors[id].content.length / 42)
        } else {
          var line_count = Math.ceil(content.length / 42)
        }

        const textarea_style = {
          height: 20 * line_count
        }

        var text_component = (
          <textarea
            className={classNames(
              'ziltag-ziltag-comment__text',
              'ziltag-ziltag-comment__text--editing'
            )}
            style={textarea_style}
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

    if ((usr && usr.name == author.name) && !usr.confirmed) {
      var warn_component = (
        <p className='ziltag-ziltag-comment__warn'>
          <img className='ziltag-ziltag-comment__warn-icon' src={warn_icon}/>
          Please verify your account to make this comment “public.”
          Haven’t receive confirmation email? <a>Send again</a>
        </p>
      )
    }

    return (
      <div
        className={classNames({
          'ziltag-ziltag-comment': true,
          'ziltag-ziltag-comment--unverified':
            (usr && usr.name == author.name) && !usr.confirmed
        })}
      >
        <Avatar
          className='ziltag-ziltag-comment__user-avatar' src={author.avatar}
        />
        <div className='ziltag-ziltag-comment__main'>
          <div>
            <span className='ziltag-ziltag-comment__user-name'>
              {author.name}
            </span>
            <TimeAgo
              className='ziltag-ziltag-comment__since'
              date={created_at}
            />
          </div>
          {text_component}
          {
            (usr && usr.name == author.name) && !usr.confirmed
            ? warn_component
            : edit_operator_components
          }
        </div>
      </div>
    )
  }
}

export default ZiltagComment

import React, {Component} from 'react'
import classNames from 'classnames'
import TimeAgo from 'react-timeago'
import TextareaAutosize from 'react-textarea-autosize'

import Avatar from '../Avatar'


try {
  if (__WEBPACK__) {
    require('./index.css')
    var warn_icon = require('./warn.png')
  }
} catch (e) {}


class ZiltagComment extends Component {
  anchorify(text) {
    if (!text) {
      return text
    }

    const regex = new RegExp(
      '\\b((?:[a-z][\\w-]+:(?:\\/{1,3}|[a-z0-9%])|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:' + '\'' + '.,<>?«»“”‘’]))',
      'ig'
    )
    const delimiter = String.fromCharCode('\u0008')

    return text.replace(regex, url => {
      return delimiter + url + delimiter
    })
    .split(delimiter)
    .map((token, i) => {
      let key = 'anchorify-text-' + i
      if (regex.test(token)) {
        return <a key={key} href={token} target='_blank' rel='noopener'>{token}</a>
      } else {
        return <span key={key} >{token}</span>
      }
    })
  }

  render() {
    const {
      id,
      content,
      author,
      created_at,
      usr,
      ziltag_comment_editors,
      resend_verification_mail_tip,
      onChange,
      activate_ziltag_comment_edit_mode,
      deactivate_ziltag_comment_edit_mode,
      activate_ziltag_comment_delete_mode,
      deactivate_ziltag_comment_delete_mode,
      edit_ziltag_comment,
      delete_ziltag_comment,
      resend_verification_mail
    } = this.props

    function save() {
      edit_ziltag_comment(id, ziltag_comment_editors[id].content)
      .then(() => deactivate_ziltag_comment_edit_mode(id))
    }

    const text_component = do {
      if (ziltag_comment_editors[id] && ziltag_comment_editors[id].mode === 'edit') {
        <TextareaAutosize
          className={classNames(
            'ziltag-ziltag-comment__text',
            'ziltag-ziltag-comment__text--editing'
          )}
          onChange={onChange}
          onKeyDown={(e) => {
            if (
              e.getModifierState('Control') || e.getModifierState('Meta') &&
              e.key == 'Enter'
            ) {
              save()
              e.preventDefault()
            }
          }}
          autoFocus
          defaultValue={content}
        />
      } else {
        <div className='ziltag-ziltag-comment__text'>
          {this.anchorify(content)}
        </div>
      }
    }

    const edit_operator_components = do {
      if (ziltag_comment_editors[id] &&
        (ziltag_comment_editors[id].mode == 'edit' ||
        ziltag_comment_editors[id].mode == 'delete')
      ) {
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
                save()
              } else if (ziltag_comment_editors[id].mode == 'delete') {
                deactivate_ziltag_comment_delete_mode(id)
              }
            }}
          >
            {
              ziltag_comment_editors[id].mode == 'edit'
              ? 'Save'
              : ziltag_comment_editors[id].mode == 'delete'
              ? 'Cancel'
              : ''
            }
          </div>
        </div>
      } else if (usr && author && usr.name === author.name) {
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
      }
    }

    const is_initiator = do {
      if ((usr && usr.name === author.name) && !usr.confirmed) {
        resend_verification_mail_tip.initiator &&
        resend_verification_mail_tip.initiator.comment &&
        resend_verification_mail_tip.initiator.comment.id == id
      }
    }

    const warn_component = do {
      if (is_initiator) {
        <p className='ziltag-ziltag-comment__warn'>
          Confirmation email sent. Please check you inbox.
        </p>
      } else {
        <p className='ziltag-ziltag-comment__warn'>
          <img className='ziltag-ziltag-comment__warn-icon' src={warn_icon}/>
          Please verify your account to make this comment "public".
          Haven’t received confirmation email?&nbsp;
          <a onClick={
            () => resend_verification_mail({
              initiator: {
                comment: {id}
              }
            })}
          >
            Send again
          </a>
        </p>
      }
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

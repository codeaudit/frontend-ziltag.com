import React, {Component} from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

import MediaCarousel from '../MediaCarousel'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagContent extends Component {
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
      mode,
      usr,
      ziltag_editor,
      media_carousel,
      onChange,
      activate_ziltag_edit_mode,
      deactivate_ziltag_edit_mode,
      activate_ziltag_delete_mode,
      edit_ziltag,
      delete_ziltag,
      go_next_media_content,
      go_prev_media_content
    } = this.props

    function save() {
      edit_ziltag(id, ziltag_editor.content)
    }

    const text_component = do {
      if (mode === 'edit') {
        <TextareaAutosize
          className={classNames(
            'ziltag-ziltag-content__text',
            'ziltag-ziltag-content__text--editing'
          )}
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
          onChange={onChange}
          defaultValue={content}
        />
      } else {
        <div className='ziltag-ziltag-content__text'>
          {this.anchorify(content)}
        </div>
      }
    }

    const edit_operator_components = do {
      if (mode === 'edit') {
        <div
          className={classNames(
            'ziltag-ziltag-content__row',
            'ziltag-ziltag-content__row--editing',
          )}
        >
          <div
            className='ziltag-ziltag-content__edit-operator'
            onClick={deactivate_ziltag_edit_mode}
          >
            Cancel
          </div>
          <div
            className={
              classNames(
                'ziltag-ziltag-content__edit-operator',
                'ziltag-ziltag-content__edit-operator--confirm'
              )
            }
            onClick={() => {
              save()
            }}
          >
            Save
          </div>
        </div>
      } else if (mode === 'delete') {
        <div
          className={classNames(
            'ziltag-ziltag-content__row',
            'ziltag-ziltag-content__row--deleting',
          )}
        >
          <div
            className={
              classNames(
                'ziltag-ziltag-content__edit-operator',
                'ziltag-ziltag-content__edit-operator--warn'
              )
            }
          >
            Delete?
          </div>
          <div
            className='ziltag-ziltag-content__edit-operator'
            onClick={() => {
              delete_ziltag(id)
            }}
          >
            Confirm
          </div>
          <div
            className='ziltag-ziltag-content__edit-operator'
            onClick={deactivate_ziltag_edit_mode}
          >
            Cancel
          </div>
        </div>
      } else if (usr && author && usr.name === author.name) {
        <div className='ziltag-ziltag-content__row'>
          <div
            className='ziltag-ziltag-content__edit-operator'
            onClick={() => activate_ziltag_edit_mode(content)}
          >
            Edit
          </div>
          <div
            className='ziltag-ziltag-content__edit-operator'
            onClick={activate_ziltag_delete_mode}
          >
            Delete
          </div>
        </div>
      }
    }

    if (media_carousel.youtube_ids && media_carousel.youtube_ids.length) {
      var media_carousel_component = (
        <MediaCarousel
          content={media_carousel}
          disable={mode == 'edit'}
          onNext={go_next_media_content}
          onPrev={go_prev_media_content}
        />
      )
    }

    return (
      <div className='ziltag-ziltag-content'>
        {text_component}
        {edit_operator_components}
        {media_carousel_component}
      </div>
    )
  }
}

export default ZiltagContent

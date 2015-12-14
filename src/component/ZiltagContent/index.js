import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagContent extends Component {
  render() {
    const {
      id,
      content,
      author,
      mode,
      usr,
      ziltag_editor,
      onChange,
      ziltag_activate_editor,
      ziltag_deactivate_editor,
      edit_ziltag
    } = this.props

    if (usr && author && usr.name == author.name) {
      var edit_operator_components = (
        <div className='ziltag-ziltag-content__row'>
          <div
            className='ziltag-ziltag-content__edit-operator'
            onClick={ziltag_activate_editor}
          >
            Edit
          </div>
          <div className='ziltag-ziltag-content__edit-operator'>Delete</div>
        </div>
      )
    }

    if (mode == 'edit') {
      var text_component = (
        <textarea
          className={classNames(
            'ziltag-ziltag-content__text',
            'ziltag-ziltag-content__text--editing'
          )}
          onChange={onChange}
          defaultValue={content}
        />
      )

      var edit_operator_components = (
          <div
            className={classNames(
              'ziltag-ziltag-content__row',
              'ziltag-ziltag-content__row--editing',
            )}
          >
            <div
              className='ziltag-ziltag-content__edit-operator'
              onClick={ziltag_deactivate_editor}
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
                edit_ziltag(id, ziltag_editor.content)
              }}
            >
              Confirm
            </div>
          </div>
      )
    } else {
      var text_component = <div className='ziltag-ziltag-content__text'>{content}</div>
    }

    return (
      <div className='ziltag-ziltag-content'>
        <div className='ziltag-ziltag-content__text'>{text_component}</div>
        {edit_operator_components}
      </div>
    )
  }
}

export default ZiltagContent

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
      map_id,
      content,
      author,
      mode,
      usr,
      ziltag_editor,
      onChange,
      activate_ziltag_edit_mode,
      deactivate_ziltag_edit_mode,
      activate_ziltag_delete_mode,
      deactivate_ziltag_delete_mode,
      edit_ziltag,
      delete_ziltag,
      pushState
    } = this.props

    if (usr && author && usr.name == author.name) {
      var edit_operator_components = (
        <div className='ziltag-ziltag-content__row'>
          <div
            className='ziltag-ziltag-content__edit-operator'
            onClick={activate_ziltag_edit_mode}
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
      )
    }

    if (mode == 'edit') {
      var text_component = (
        <textarea
          className={classNames(
            'ziltag-ziltag-content__text',
            'ziltag-ziltag-content__text--editing'
          )}
          autoFocus
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
                edit_ziltag(id, ziltag_editor.content)
              }}
            >
              Confirm
            </div>
          </div>
      )
    } else {
      var text_component = <div className='ziltag-ziltag-content__text'>{content}</div>

      if (mode == 'delete') {
        var edit_operator_components = (
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
                .then(() => {
                  pushState(null, `/ziltag_maps/${map_id}`)
                })
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
        )
      }
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

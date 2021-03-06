import React, {Component} from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagInput extends Component {
  render() {
    const {
      onChange,
      onSubmit,
      ziltag_input
    } = this.props

    function submit() {
      if (ziltag_input.content) {
        onSubmit()
      }
    }

    return (
      <div className='ziltag-ziltag-input'>
        <TextareaAutosize
          autoFocus
          placeholder='Your text here'
          onChange={onChange}
          onKeyDown={(e) => {
            if (
              e.getModifierState('Control') || e.getModifierState('Meta') &&
              e.key == 'Enter'
            ) {
              submit()
              e.preventDefault()
            }
          }}
        />
        <div
          onClick={submit}
          className={classNames({
            'ziltag-ziltag-input__post': true,
            'ziltag-ziltag-input__post--activated': ziltag_input.content
          })}
        >
          Post
        </div>
      </div>
    )
  }
}

export default ZiltagInput

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

    const {
      ctrl_pressed
    } = this.state || {}

    function is_ctrl(keyCode) {
      return keyCode == 91 || keyCode == 93 || keyCode == 17
    }

    function submit() {
      if (ziltag_input.content) {
        onSubmit()
      }
    }

    return (
      <div className='ziltag-ziltag-input'>
        <TextareaAutosize
          onChange={onChange}
          onKeyDown={(e) => {
            if (is_ctrl(e.keyCode)) {
              this.setState({ctrl_pressed: true})
            }
            if (ctrl_pressed && e.key == 'Enter') {
              submit()
              e.preventDefault()
            }
          }}
          onKeyUp={(e) => {
            if (is_ctrl(e.keyCode)) {
              this.setState({ctrl_pressed: false})
            }
          }}
          placeholder='Your text here'
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

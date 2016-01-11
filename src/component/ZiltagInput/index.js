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

    return (
      <div className='ziltag-ziltag-input'>
        <TextareaAutosize
          onChange={onChange}
          placeholder='Your text here'
        />
        <div
          onClick={() => {
            if (ziltag_input.content) {
              onSubmit()
            }
          }}
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

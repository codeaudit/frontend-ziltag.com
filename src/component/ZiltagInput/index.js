import React, {Component} from 'react'
import classNames from 'classnames'


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

    if (ziltag_input.content) {
      var line_count = Math.ceil(ziltag_input.content.length / 16)
    } else {
      var line_count = 1
    }

    const textarea_style = {
      height: 15 * line_count
    }

    return (
      <div className='ziltag-ziltag-input'>
        <textarea
          style={textarea_style}
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

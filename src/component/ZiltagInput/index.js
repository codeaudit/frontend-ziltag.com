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

    return (
      <div className='ziltag-ziltag-input'>
        <textarea onChange={onChange} placeholder='Your text here'/>
        <div
          onClick={onSubmit}
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

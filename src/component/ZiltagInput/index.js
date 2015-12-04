import React, {Component} from 'react'


class ZiltagInput extends Component {
  render() {
    const {
      onChange,
      onSubmit
    } = this.props

    return (
      <div className='ziltag-ziltag-input'>
        <input
          onChange={onChange}
          className='ziltag-ziltag-input__input'
        />
        <div
          onClick={onSubmit}
          className='ziltag-ziltag-input__submit'
        >
          POST
        </div>
      </div>
    )
  }
}

export default ZiltagInput

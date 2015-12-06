import React, {Component} from 'react'
import ZiltagMapDialog from '../ZiltagMapDialog'

try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

class ZiltagInput extends Component {
  render() {
    const {
      onChange,
      onSubmit
    } = this.props

    let viewProps = {
      content: (
        <input
          onChange={onChange}
          className='ziltag-ziltag-input__input'
          placeholder='Your text here'
        />
      ),
      side: (
        <div
          onClick={onSubmit}
          className='ziltag-ziltag-input__submit'
        >
          POST
        </div>
      )
    }

    return (
      <div className='ziltag-ziltag-input'>
        <ZiltagMapDialog {...viewProps} />
      </div>
    )
  }
}

export default ZiltagInput

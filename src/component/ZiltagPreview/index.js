import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagPreview extends Component {
  render() {
    const {
      data
    } = this.props

    return (
      <div className='ziltag-ziltag-preview'>
        {data.preview}
      </div>
    )
  }
}

export default ZiltagPreview

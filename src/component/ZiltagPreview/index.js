import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagPreview extends Component {
  render() {
    const {
      ziltag
    } = this.props

    return (
      <div className='ziltag-ziltag-preview'>
        {ziltag.preview}
        <img className='ziltag-ziltag-preview__avatar' src={ziltag.usr.avatar}/>
      </div>
    )
  }
}

export default ZiltagPreview

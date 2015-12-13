import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagContent extends Component {
  render() {
    const {
      current_ziltag
    } = this.props

    return (
      <div className='ziltag-ziltag-content'>
        {current_ziltag.content}
      </div>
    )
  }
}

export default ZiltagContent

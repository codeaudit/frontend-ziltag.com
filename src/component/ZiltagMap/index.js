import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMap extends Component {
  render() {
    const {
      data
    } = this.props

    return (
      <div className='ziltag-ziltag-map'>
        <img className='ziltag-ziltag-map-src' src={data.src}/>
        <div className='ziltag-ziltag-map-prompt'>click anywhere to tag</div>
      </div>
    )
  }
}

export default ZiltagMap

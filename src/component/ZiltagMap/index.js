import React, {Component} from 'react'

import Ziltag from '../Ziltag'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMap extends Component {
  render() {
    const {
      get_ziltag,
      data
    } = this.props

    const ziltags = data.ziltags && data.ziltags.map(
      ziltag => {
        const enhanced_ziltag = Object.assign({}, ziltag)
        enhanced_ziltag.x = ziltag.x * data.width
        enhanced_ziltag.y = ziltag.y * data.height
        return <Ziltag get_ziltag={get_ziltag} data={enhanced_ziltag} key={ziltag.id}/>
      }
    )

    return (
      <div className='ziltag-ziltag-map'>
        <img className='ziltag-ziltag-map__src' src={data.src}/>
        <div className='ziltag-ziltag-map__prompt'>click anywhere to tag</div>
        <div
          style={{
            width: data.width,
            height: data.height
          }}
          className='ziltag-ziltag-map__container'
        >
          {ziltags}
        </div>
      </div>
    )
  }
}

export default ZiltagMap

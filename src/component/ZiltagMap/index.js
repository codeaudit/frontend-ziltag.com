import React, {Component} from 'react'

import Ziltag from '../Ziltag'
import ZiltagPreview from '../ZiltagPreview'
import CoDiv from '../CoDiv'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMap extends Component {
  render() {
    const {
      fetch_ziltag,
      hover_on_ziltag,
      unhover_on_ziltag,
      ziltag_map,
      current_ziltag
    } = this.props

    const ziltags = ziltag_map.ziltags && ziltag_map.ziltags.map(
      ziltag => {
        const enhanced_ziltag = {...ziltag}
        const direction = ziltag.x < 0.5 ? 'right' : 'left'

        enhanced_ziltag.x = ziltag.x * ziltag_map.width
        enhanced_ziltag.y = ziltag.y * ziltag_map.height

        enhanced_ziltag.activated = ziltag.id == current_ziltag.id
        ? true : false

        return [
          <Ziltag
            onClick={() => fetch_ziltag(ziltag.id)}
            onMouseEnter={() => hover_on_ziltag(ziltag.id)}
            onMouseLeave={() => unhover_on_ziltag(ziltag.id)}
            ziltag={enhanced_ziltag}
            key={ziltag.id}
          />,
          <CoDiv
            direction={direction}
            ziltag={enhanced_ziltag}
            key={'p' + ziltag.id}
          >
            <ZiltagPreview ziltag={enhanced_ziltag}/>
          </CoDiv>
        ]
      }
    )

    return (
      <div className='ziltag-ziltag-map'>
        <img
          style={{
            width: ziltag_map.width,
            height: ziltag_map.height
          }}
          className='ziltag-ziltag-map__src'
          src={ziltag_map.src}
        />
        <div className='ziltag-ziltag-map__prompt'>
          click anywhere to tag
        </div>
        <div
          style={{
            width: ziltag_map.width,
            height: ziltag_map.height,

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

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
      get_ziltag,
      hover_on_ziltag,
      unhover_on_ziltag,
      data
    } = this.props

    const ziltags = data.ziltags && data.ziltags.map(
      ziltag => {
        const enhanced_ziltag = Object.assign({}, ziltag)
        const direction = ziltag.x < 0.5 ? 'right' : 'left'

        enhanced_ziltag.x = ziltag.x * data.width
        enhanced_ziltag.y = ziltag.y * data.height

        return [
          <Ziltag
            onClick={() => get_ziltag(ziltag.id)}
            onMouseEnter={() => hover_on_ziltag(ziltag.id)}
            onMouseLeave={() => unhover_on_ziltag(ziltag.id)}
            data={enhanced_ziltag}
            key={ziltag.id}
          />,
          <CoDiv
            direction={direction}
            data={enhanced_ziltag}
            key={'p' + ziltag.id}
          >
            <ZiltagPreview data={enhanced_ziltag}/>
          </CoDiv>
        ]
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

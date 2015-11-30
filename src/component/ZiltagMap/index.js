import React, {Component} from 'react'


class ZiltagMap extends Component {
  render() {
    const {
      data
    } = this.props

    return (
      <div className='ziltag-ziltag-map'>
        <img className='ziltag-ziltag-map-src' src={data.src}/>
      </div>
    )
  }
}

export default ZiltagMap

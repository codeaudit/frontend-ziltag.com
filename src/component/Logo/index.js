import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class Logo extends Component {
  render() {
    return <a className='ziltag-logo' href='/' target='_blank'/>
  }
}

export default Logo

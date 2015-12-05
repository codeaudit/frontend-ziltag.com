import React, {Component} from 'react'
import ZiltagMapDialog from '../ZiltagMapDialog'

try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

class ZiltagMapAuthentication extends Component {
  render() {
    let side = (
      <div>
        <div className="ziltag_map_authentication__action">Sign Up</div>
        <div className="ziltag_map_authentication__action">Login</div>
      </div>
    )
    return (
      <ZiltagMapDialog className="ziltag_map_authentication" side={side}>
        <div className="ziltag_map_authentication__message">Oops! You need to have an account to post a tag.</div>
      </ZiltagMapDialog>
    )
  }
}

export default ZiltagMapAuthentication

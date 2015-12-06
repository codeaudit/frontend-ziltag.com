import React, {Component} from 'react'
import ZiltagMapDialog from '../ZiltagMapDialog'

try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

class ZiltagMapVerification extends Component {
  render() {
    return (
      <ZiltagMapDialog className="ziltag_map_verification" side={<div className="ziltag_map_verification__resend">Resend Email</div>}>
        <div className="ziltag_map_verification__message">Please verify your account to post a tag.</div>
        <div className="ziltag_map_verification__footer">Haven’t receive confirmation email?</div>
      </ZiltagMapDialog>
    )
  }
}

export default ZiltagMapVerification

import React, {Component} from 'react'
import ZiltagMapTextField from '../ZiltagMapTextField'
import ZiltagMapAuthContent from '../ZiltagMapAuthContent'

class ZiltagMapLoginForm extends Component {
  render() {
    return (
      <div>
        <ZiltagMapTextField name="login" placeholder="Email or Username" icon="email" />
        <ZiltagMapTextField name="password" placeholder="Password" icon="password" />
        <div className="ziltag-ziltag-map-auth-content__submit">Login</div>
        <div className="ziltag-ziltag-map-auth-content__footer ziltag-ziltag-map-auth-content__footer--blue"><a href="#">Forget password?</a></div>
      </div>
    )
  }
}

export default ZiltagMapLoginForm

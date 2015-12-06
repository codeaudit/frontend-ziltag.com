import React, {Component} from 'react'
import ZiltagMapTextField from '../ZiltagMapTextField'
import ZiltagMapAuthContent from '../ZiltagMapAuthContent'

class ZiltagMapLoginForm extends Component {
  render() {
    const {
      onUserChange,
      onPasswordChange,
      onSubmit
    } = this.props

    return (
      <div>
        <ZiltagMapTextField onChange={onUserChange} name="login" placeholder="Email or Username" icon="email" />
        <ZiltagMapTextField onChange={onPasswordChange} name="password" placeholder="Password" icon="password" />
        <div onClick={onSubmit} className="ziltag-ziltag-map-auth-content__submit">Login</div>
        <div className="ziltag-ziltag-map-auth-content__footer ziltag-ziltag-map-auth-content__footer--blue"><a href="#">Forget password?</a></div>
      </div>
    )
  }
}

export default ZiltagMapLoginForm

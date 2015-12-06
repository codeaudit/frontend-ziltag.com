import React, {Component} from 'react'
import ZiltagMapAuthDialog from '../ZiltagMapAuthDialog'
import ZiltagMapAuthentication from '../ZiltagMapAuthentication'


class ZiltagMapWarn extends Component {
  render() {
    const {
      type,
      login,
      sign_up,
      resend
    } = this.props

    const auth_warn = (
      <div>
        should login or sign up
        <div onClick={sign_up}>Sign Up</div>
        <div onClick={login}>Login</div>
      </div>
    )

    const verify_warn = (
      <div>
        should verify
        <div onClick={resend}>
          Resend Email
        </div>
      </div>
    )

    return (
      <div className='ziltag-ziltag-map-warn'>
        {
          type == 'auth'
          ? <ZiltagMapAuthentication sign_up={sign_up} login={login}/>
          : type == 'verify'
          ? <ZiltagMapVerification resend={resend}/>
          : ''
        }
      </div>
    )
  }
}

export default ZiltagMapWarn

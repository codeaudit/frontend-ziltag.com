import React, {Component} from 'react'
import ZiltagMapAuthentication from '../ZiltagMapAuthentication'
import ZiltagMapVerification from '../ZiltagMapVerification'


class ZiltagMapWarn extends Component {
  render() {
    const {
      type,
      login,
      sign_up,
      resend
    } = this.props

    // const auth_warn = (
    //   <div>
    //     should login or sign up
    //     <div onClick={sign_up}>Sign Up</div>
    //     <div onClick={login}>Login</div>
    //   </div>
    // )

    // const verify_warn = (
    //   <div>
    //     should verify
    //     <div onClick={resend}>
    //       Resend Email
    //     </div>
    //   </div>
    // )

    // return (
    //   <div className='ziltag-ziltag-map-warn'>
    //     {
    //       type == 'auth'
    //       ? auth_warn
    //       : type == 'verify'
    //       ? verify_warn
    //       : ''
    //     }
    //   </div>
    // )
    switch(type){
      case 'authentication':
        return <ZiltagMapAuthentication />
        break
      case 'verification':
        return <ZiltagMapVerification />
        break
      default:
        return console.error(`Unknown Type: ${type}`)
    }
  }
}

export default ZiltagMapWarn

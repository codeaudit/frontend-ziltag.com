import React, {Component} from 'react'
import ZiltagMapAuthDialog from '../ZiltagMapAuthDialog'
import ZiltagMapTextField from '../ZiltagMapTextField'

class ZiltagMapSignUpForm extends Component {
  render() {
    return (
      <ZiltagMapAuthDialog select="sign-up">
        <ZiltagMapTextField name="username" placeholder="Username" icon="username" />
        <ZiltagMapTextField name="email" placeholder="Email" icon="email" />
        <div className="auth-dialog__submit">Sign Up</div>
        <div className="auth-dialog__footer">Signing up means you agree with our <a href="/term_of_service" target="_blank">Terms</a> and <a href="/privacy_policy" target="_blank">Privacy Policy.</a></div>
      </ZiltagMapAuthDialog>
    )
  }
}

export default ZiltagMapSignUpForm

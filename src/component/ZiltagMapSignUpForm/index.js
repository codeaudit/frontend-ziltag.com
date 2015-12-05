import React, {Component} from 'react'
import ZiltagMapTextField from '../ZiltagMapTextField'
import ZiltagMapAuthContent from '../ZiltagMapAuthContent'

class ZiltagMapSignUpForm extends Component {
  render() {
    const {
      onNameChange,
      onEmailChange,
      onSubmit
    } = this.props

    return (
      <div>
        <ZiltagMapTextField onChange={onNameChange} name="username" placeholder="Username" icon="username" />
        <ZiltagMapTextField onChange={onEmailChange} name="email" placeholder="Email" icon="email" />
        <div onClick={onSubmit} className="ziltag-ziltag-map-auth-content__submit">Sign Up</div>
        <div className="ziltag-ziltag-map-auth-content__footer">Signing up means you agree with our <a href="/term_of_service" target="_blank">Terms</a> and <a href="/privacy_policy" target="_blank">Privacy Policy.</a></div>
      </div>
    )
  }
}

export default ZiltagMapSignUpForm

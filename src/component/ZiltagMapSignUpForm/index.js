import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMapSignUpForm extends Component {
  render() {
    const {

    } = this.props

    return (
      <div className='ziltag-ziltag-map-sign-up-form'>
        <div className="interactive_dialog">
          <div className="interactive_dialog__content">
            <form className="auth-form">
              <div className="auth-form__fields">
                <div className="field">
                  <input type="text" className="field__input" placeholder="Username" />
                  <img src="username.png" className="field__icon" />
                </div>
                <div className="field">
                  <input type="text" className="field__input" placeholder="Email" />
                  <img src="email.png" className="field__icon" />
                </div>
                <div className="auth-form__field" />
              </div>
              <div className="auth-form__action">Sign Up</div>
              <div className="auth-form__footer">Signing up means you agree with our Terms and Privacy Policy.</div>
            </form>
          </div>
          <div className="interactive_dialog__actions">
            <div className="interactive_dialog__action--active">Sign up</div>
            <div className="interactive_dialog__action">Login</div>
            <div className="interactive_dialog__cancel">Cancel</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ZiltagMapSignUpForm

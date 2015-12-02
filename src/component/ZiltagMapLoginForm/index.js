import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMapLoginForm extends Component {
  render() {
    const {

    } = this.props

    return (
      <div className="interactive_dialog">
        <div className="interactive_dialog__content">
          <form className="auth-form">
            <div className="auth-form__fields">
              <div className="field">
                <input type="text" className="field__input" placeholder="Email" />
                <img src="email.png" className="field__icon" />
              </div>
              <div className="field">
                <input type="text" className="field__input" placeholder="Password" />
                <img src="password.png" className="field__icon" />
              </div>
              <div className="auth-form__field" />
            </div>
            <div className="auth-form__action">Login</div>
            <div className="auth-form__footer">forget password?</div>
          </form>
        </div>
        <div className="interactive_dialog__actions">
          <div className="interactive_dialog__action">Sign up</div>
          <div className="interactive_dialog__action--active">Login</div>
          <div className="interactive_dialog__cancel">Cancel</div>
        </div>
      </div>
    )
  }
}

export default ZiltagMapLoginForm
